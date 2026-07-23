import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Công cụ tĩnh độc lập ngoài app Next.js (xem CLAUDE.md mục 10) — không lint theo rule TS/React.
      "server.js",
      "site-data.js",
      "admin.html",
    ],
  },
];

export default eslintConfig;
