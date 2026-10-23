/* global el, data, sectionEl, field, repeater, fieldCb, imageField, parseDriveId, apply, toast */

// Reorder only the slots belonging to the selected category. Other categories stay put.
function reorderVideoItems(items, visible, from, to) {
  if (from < 0 || to < 0 || from >= visible.length || to >= visible.length || from === to) return null;
  const reordered = visible.slice();
  reordered.splice(to, 0, reordered.splice(from, 1)[0]);
  const selected = new Set(visible);
  let index = 0;
  return items.map(item => selected.has(item) ? reordered[index++] : item);
}

function buildVideoManager(host, summary) {
  let category = 'all';
  let dragged = null;
  const history = [];
  const thumbnails = new WeakMap();
  async function fetchThumbnail(item, retry = false) {
    const fileId = item.driveFileId;
    if (!fileId || item.thumb) return;
    const previous = thumbnails.get(item);
    if (previous?.fileId === fileId && (previous.loading || !retry)) return;
    thumbnails.set(item, {fileId, loading: true, error: ''});
    if (!dragged) render();
    try {
      const response = await fetch('/api/thumbnail', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({fileId}),
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || 'Không lấy được thumbnail');
      // An upload, link change, deletion or import during the request takes priority.
      if (!item.thumb && item.driveFileId === fileId && data.works.items.includes(item) && host.isConnected) {
        item.thumb = result.url;
        apply();
      }
      thumbnails.set(item, {fileId, loading: false, error: ''});
    } catch (error) {
      thumbnails.set(item, {fileId, loading: false, error: error.message});
      if (retry) toast(error.message);
    }
    if (!dragged && host.isConnected) render();
  }
  const settings = sectionEl('Tiêu đề & thể loại', body => {
    body.appendChild(field(data.works, 'title', 'Tiêu đề mục'));
    body.appendChild(field(data.works, 'subtitle', 'Mô tả mục', null, true));
    body.appendChild(el('p', 'hint', 'Kéo ⠿ để đổi thứ tự các thể loại trên trang chủ.'));
    repeater(body, data.works.filters, null, (box, item) => {
      const row = el('div', 'row2');
      row.appendChild(fieldCb(item, 'key', 'Mã thể loại', null, render));
      row.appendChild(fieldCb(item, 'label', 'Tên hiển thị', null, () => {
        data.works.items.forEach(video => { if (video.cat === item.key) video.catLabel = item.label; });
        render();
      }));
      box.appendChild(row);
    }, () => ({key: 'new-' + Date.now(), label: 'Thể loại mới'}), 'Thể loại', render, true);
  });
  settings.classList.add('video-settings');
  const tabs = el('div', 'video-tabs');
  tabs.setAttribute('role', 'group');
  tabs.setAttribute('aria-label', 'Lọc video theo thể loại');
  const toolbar = el('div', 'video-toolbar');
  const status = el('p');
  status.setAttribute('aria-live', 'polite');
  const tools = el('div', 'video-actions');
  const undo = button('↶ Hoàn tác sắp xếp', () => {
    if (!history.length) return;
    data.works.items = history.pop();
    render(); apply(); toast('Đã hoàn tác lần sắp xếp vừa rồi');
  });
  const add = button('+ Thêm video', () => {
    const filter = data.works.filters.find(f => f.key === category && f.key !== 'all') || data.works.filters.find(f => f.key !== 'all');
    if (!filter) { toast('Hãy thêm thể loại trước khi thêm video'); return; }
    const item = {id: Date.now(), title: 'Video mới', cat: filter.key, catLabel: filter.label, dur: '0:30', role: '', desc: '', driveFileId: '', thumb: '', hue: 'linear-gradient(150deg,#0b3b2e,#065f46,#0e7c5a)'};
    data.works.items.push(item);
    history.length = 0;
    render(); apply(); edit(item);
  });
  add.classList.add('primary');
  tools.append(undo, add);
  toolbar.append(status, tools);
  const grid = el('div', 'video-grid');
  grid.setAttribute('aria-label', 'Danh sách video');
  host.append(settings, tabs, toolbar, el('p', 'hint', 'Kéo tay cầm ⠿ trên ảnh để sắp xếp, hoặc dùng nút Đầu / Trước / Sau. Thay đổi được tự động lưu.'), grid);
  grid.style.marginTop = '14px';

  function button(label, action, title) {
    const btn = el('button', 'btn sm', label);
    btn.type = 'button';
    if (title) { btn.title = title; btn.setAttribute('aria-label', title); }
    btn.onclick = action;
    return btn;
  }
  function visibleItems() { return data.works.items.filter(item => category === 'all' || item.cat === category); }
  function clearMarkers() { grid.querySelectorAll('.video-card').forEach(card => card.classList.remove('drop-before', 'drop-after')); }
  function move(item, to) {
    const visible = visibleItems();
    const next = reorderVideoItems(data.works.items, visible, visible.indexOf(item), to);
    if (!next) return;
    history.push(data.works.items.slice());
    if (history.length > 30) history.shift();
    data.works.items = next;
    render(); apply();
    toast('Đã chuyển “' + item.title + '” đến vị trí ' + (to + 1));
    const movedCard = Array.from(grid.children).find(card => card.dataset.videoId === String(item.id));
    movedCard?.querySelector('.edit-video')?.focus({preventScroll: true});
  }
  function render() {
    const filters = data.works.filters.filter(f => f.key !== 'all');
    if (category !== 'all' && !data.works.items.some(item => item.cat === category) && !filters.some(f => f.key === category)) category = 'all';
    tabs.replaceChildren();
    const categories = [{key: 'all', label: 'Tất cả'}, ...filters];
    const known = new Set(categories.map(f => f.key));
    data.works.items.forEach(item => {
      if (!known.has(item.cat)) { categories.push({key: item.cat, label: item.catLabel || item.cat || 'Chưa phân loại'}); known.add(item.cat); }
    });
    categories.forEach(filter => {
      const count = data.works.items.filter(item => filter.key === 'all' || item.cat === filter.key).length;
      const tab = button(filter.label + ' (' + count + ')', () => { category = filter.key; render(); });
      tab.classList.toggle('active', category === filter.key);
      tab.setAttribute('aria-pressed', String(category === filter.key));
      tabs.appendChild(tab);
    });
    const visible = visibleItems();
    status.textContent = visible.length + ' video · ' + (categories.find(f => f.key === category)?.label || category);
    undo.disabled = history.length === 0;
    let count = summary.querySelector('.cnt');
    if (!count) { count = el('span', 'cnt'); summary.appendChild(count); }
    count.textContent = data.works.items.length + ' video';
    grid.replaceChildren();
    if (!visible.length) grid.appendChild(el('p', 'video-empty', 'Chưa có video trong mục này. Bấm “Thêm video” để bắt đầu.'));
    visible.forEach((item, index) => {
      const card = el('article', 'video-card');
      card.dataset.videoId = item.id;
      const thumb = el('div', 'video-thumb');
      if (item.thumb) { const img = el('img'); img.src = item.thumb; img.alt = item.title; img.loading = 'lazy'; img.draggable = false; thumb.appendChild(img); }
      else {
        const state = thumbnails.get(item);
        const message = el('p', 'hint', state?.loading ? 'Đang lấy ảnh từ video…' : state?.error ? 'Chưa lấy được ảnh · bấm Chỉnh sửa để thử lại' : 'Chưa có thumbnail');
        message.style.cssText = 'position:absolute;inset:40% 12px auto;text-align:center;color:white';
        thumb.appendChild(message);
      }
      thumb.append(el('span', 'video-badge', item.catLabel || item.cat), el('span', 'video-duration', item.dur));
      const handle = button('⠿', () => {}, 'Kéo để sắp xếp: ' + item.title);
      handle.classList.add('video-handle');
      handle.draggable = true;
      handle.ondragstart = event => {
        dragged = item;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', '');
        event.dataTransfer.setDragImage(card, 35, 25);
        card.classList.add('dragging');
      };
      handle.ondragend = () => { dragged = null; card.classList.remove('dragging'); clearMarkers(); };
      thumb.appendChild(handle);
      card.ondragover = event => {
        if (!dragged || dragged === item) return;
        event.preventDefault(); event.dataTransfer.dropEffect = 'move';
        clearMarkers();
        const rect = card.getBoundingClientRect();
        card.classList.add(event.clientX > rect.left + rect.width / 2 ? 'drop-after' : 'drop-before');
      };
      card.ondrop = event => {
        if (!dragged) return;
        event.preventDefault();
        const rect = card.getBoundingClientRect();
        let to = index + (event.clientX > rect.left + rect.width / 2 ? 1 : 0);
        if (visible.indexOf(dragged) < to) to--;
        move(dragged, to); dragged = null; clearMarkers();
      };
      const info = el('div', 'video-info');
      info.appendChild(el('h3', null, (index + 1) + '. ' + item.title));
      const actions = el('div', 'video-actions');
      const editButton = button('Chỉnh sửa', () => edit(item), 'Chỉnh sửa: ' + item.title);
      editButton.classList.add('edit-video');
      actions.appendChild(editButton);
      info.appendChild(actions);
      const moves = el('div', 'video-moves');
      [['⇤ Đầu', 0, 'Đưa lên đầu'], ['← Trước', index - 1, 'Tiến một vị trí'], ['Sau →', index + 1, 'Lùi một vị trí']].forEach(([label, to, title]) => {
        const btn = button(label, () => move(item, to), title + ': ' + item.title);
        btn.disabled = to < 0 || to >= visible.length || to === index;
        moves.appendChild(btn);
      });
      info.appendChild(moves);
      card.append(thumb, info); grid.appendChild(card);
    });
  }
  function edit(item) {
    const dialog = el('dialog', 'video-dialog');
    dialog.setAttribute('aria-labelledby', 'video-dialog-title');
    const heading = el('div', 'video-dialog-head');
    const title = el('h2', null, 'Chỉnh sửa video'); title.id = 'video-dialog-title';
    heading.append(title, button('Xong', () => dialog.close()));
    const body = el('div', 'video-dialog-body');
    body.appendChild(el('p', 'hint', 'Nội dung tự động lưu khi bạn chỉnh sửa.'));
    body.appendChild(field(item, 'title', 'Tên video'));
    const label = el('label', 'fld'); label.appendChild(el('span', null, 'Thể loại'));
    const select = el('select');
    const filters = data.works.filters.filter(f => f.key !== 'all');
    if (!filters.some(f => f.key === item.cat)) filters.push({key: item.cat, label: item.catLabel || item.cat});
    filters.forEach(filter => { const option = el('option', null, filter.label); option.value = filter.key; option.selected = item.cat === filter.key; select.appendChild(option); });
    select.onchange = () => { item.cat = select.value; item.catLabel = filters.find(f => f.key === select.value).label; history.length = 0; apply(); };
    label.appendChild(select); body.appendChild(label);
    body.append(field(item, 'dur', 'Thời lượng'), field(item, 'role', 'Vai trò'), field(item, 'desc', 'Mô tả ngắn', null, true));
    const drive = field(item, 'driveFileId', 'Link hoặc ID Google Drive');
    const input = drive.querySelector('input');
    input.oninput = () => { item.driveFileId = parseDriveId(input.value); apply(); };
    input.onchange = () => { void fetchThumbnail(item); };
    body.append(drive, el('p', 'hint', 'Video Drive cần chia sẻ “Anyone with the link”.'), imageField(item, 'thumb', 'Ảnh thumbnail', 900));
    const autoThumb = button('Tự lấy ảnh từ video', async () => {
      if (item.thumb) { toast('Video đã có thumbnail. Xóa ảnh hiện tại nếu muốn lấy lại từ video.'); return; }
      if (!item.driveFileId) { toast('Dán link Google Drive trước khi lấy ảnh.'); return; }
      autoThumb.disabled = true;
      await fetchThumbnail(item, true);
      autoThumb.disabled = false;
      if (item.thumb) { dialog.close(); toast('Đã lấy và lưu thumbnail từ video'); }
    });
    autoThumb.style.marginTop = '12px'; body.appendChild(autoThumb);
    const remove = button('Xóa video', () => {
      remove.disabled = true;
      const confirmation = el('div', 'video-delete-confirm', 'Xóa “' + item.title + '” khỏi danh sách?');
      const actions = el('div', 'video-actions');
      actions.append(button('Hủy', () => { confirmation.remove(); remove.disabled = false; }), button('Xác nhận xóa', () => {
        data.works.items = data.works.items.filter(video => video !== item);
        history.length = 0; apply(); dialog.close(); toast('Đã xóa video');
      }));
      confirmation.appendChild(actions); body.appendChild(confirmation);
    });
    remove.style.marginTop = '20px'; body.appendChild(remove);
    dialog.append(heading, body); document.body.appendChild(dialog);
    dialog.onclose = () => { dialog.remove(); render(); void fetchThumbnail(item); };
    dialog.showModal();
  }
  render();
  // Existing manual thumbnails are untouched. Fill missing images when admin loads.
  data.works.items.filter(item => !item.thumb && item.driveFileId).forEach(item => { void fetchThumbnail(item); });
}

window.buildVideoManager = buildVideoManager;
