import type { SiteProfile, WorksSection } from "@/data/types";

const TR_KEY = "trCacheVienEn_v1";

let TR: Record<string, string> = {};
let trLoaded = false;
let trDirty = false;

function loadTR() {
  if (trLoaded || typeof window === "undefined") return;
  trLoaded = true;
  try {
    TR = JSON.parse(localStorage.getItem(TR_KEY) || "{}");
  } catch {
    TR = {};
  }
}

function saveTR() {
  if (!trDirty || typeof window === "undefined") return;
  try {
    localStorage.setItem(TR_KEY, JSON.stringify(TR));
    trDirty = false;
  } catch {
    // ignore quota errors
  }
}

const hasLetters = (s: string) => /[A-Za-zÀ-Ỿà-ỹ]/.test(s);
// Chỉ dịch đoạn có DẤU tiếng Việt; đoạn thuần ASCII (Motion, Premiere Pro, tên riêng...) giữ nguyên
const viMarks =
  /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;

async function trSeg(seg: string): Promise<string> {
  loadTR();
  const k = seg.trim();
  if (!k || !hasLetters(k) || !viMarks.test(k)) return seg;
  if (TR[k] != null) return seg.replace(k, TR[k]);
  try {
    const url =
      "https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(k) +
      "&langpair=vi|en&de=vgtglobaltradingjsc@gmail.com";
    const res = await fetch(url);
    const j = await res.json();
    const t = j && j.responseData && j.responseData.translatedText;
    if (t && typeof t === "string" && String(j.responseStatus) === "200") {
      TR[k] = t;
      trDirty = true;
      return seg.replace(k, t);
    }
  } catch {
    // lỗi mạng → giữ tiếng Việt
  }
  return seg;
}

export async function trText(text: string | null | undefined): Promise<string> {
  const src = String(text == null ? "" : text);
  if (!src.trim() || !hasLetters(src)) return src;
  const parts = src.split("\n"); // giữ nguyên xuống dòng
  const out = await Promise.all(parts.map(trSeg));
  return out.join("\n");
}

async function trField<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  jobs: Promise<void>[]
) {
  const val = obj[key];
  if (typeof val === "string" && val) {
    jobs.push(
      trText(val).then((v) => {
        (obj as Record<string, unknown>)[key as string] = v;
      })
    );
  }
}

async function trArrayField<T extends object>(
  arr: T[] | undefined,
  key: keyof T,
  jobs: Promise<void>[]
) {
  if (!Array.isArray(arr)) return;
  arr.forEach((item) => {
    void trField(item, key, jobs);
  });
}

async function trStringArray(arr: string[] | undefined, jobs: Promise<void>[]) {
  if (!Array.isArray(arr)) return;
  arr.forEach((v, i) => {
    if (v) {
      jobs.push(
        trText(v).then((x) => {
          arr[i] = x;
        })
      );
    }
  });
}

export async function translateProfile(base: SiteProfile): Promise<SiteProfile> {
  const d: SiteProfile = JSON.parse(JSON.stringify(base));
  const jobs: Promise<void>[] = [];

  (
    [
      "eyebrow",
      "title",
      "highlight",
      "lead",
      "badge",
      "ctaPrimary",
      "ctaSecondary",
      "floatTitle",
      "floatSub",
    ] as const
  ).forEach((k) => void trField(d.hero, k, jobs));

  void trArrayField(d.stats, "label", jobs);

  (["eyebrow", "title", "highlight", "ringLabel", "skillsTitle"] as const).forEach((k) =>
    void trField(d.about, k, jobs)
  );
  void trStringArray(d.about.bio, jobs);
  void trStringArray(d.about.skills, jobs);
  void trArrayField(d.about.statCards, "label", jobs);

  (["eyebrow", "heading", "text"] as const).forEach((k) => void trField(d.contact, k, jobs));

  void trField(d, "footer", jobs);

  await Promise.all(jobs);
  saveTR();
  return d;
}

export async function translateWorks(base: WorksSection): Promise<WorksSection> {
  const d: WorksSection = JSON.parse(JSON.stringify(base));
  const jobs: Promise<void>[] = [];

  (["title", "subtitle"] as const).forEach((k) => void trField(d, k, jobs));
  void trArrayField(d.filters, "label", jobs);
  d.items.forEach((it) => {
    (["title", "catLabel", "desc", "role"] as const).forEach((k) => void trField(it, k, jobs));
  });

  await Promise.all(jobs);
  saveTR();
  return d;
}
