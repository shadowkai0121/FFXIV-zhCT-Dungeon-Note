# FF14 繁中攻略筆記

以 `Astro + Markdown` 建立的 FF14 高難副本攻略資料庫，目標是提供可搜尋、可追蹤版本的繁中攻略。

## 技術棧

- Astro（靜態網站）
- Markdown Content Collections（內容模型）
- Pagefind（靜態全文搜尋）
- GitHub Pages + GitHub Actions（CI/CD）

## 本機開發

需求：Node.js `>=20`

```bash
npm ci
npm run dev
```

## 常用指令

```bash
npm run check   # 內容驗證 + astro check
npm run test    # vitest
npm run build   # astro build + pagefind 索引
npm run preview
```

## 環境變數

- `PUBLIC_GA_MEASUREMENT_ID`
  - 預設值：`G-6EKYJCTHVP`
  - 若需切換 GA 資源，可在 CI 或本機 `.env` 覆寫。

## 內容新增流程

1. 複製 `src/content/guides/_template.md`
2. 建立新檔到 `src/content/guides/<patch>/<slug>.md`
3. 填寫 frontmatter 並撰寫正文
4. 執行 `npm run check && npm run test && npm run build`

### frontmatter 欄位

必填：

- `title`: 攻略標題（繁中）
- `slug`: 英文 kebab-case，網址識別
- `dutyType`: `ultimate | savage | extreme`
- `patch`: 版本字串，例如 `7.2`
- `encounter`: 副本代號，例如 `M4S`
- `summary`: 120-200 字摘要（schema 允許 40-260）
- `tags`: 標籤陣列
- `lastVerifiedAt`: 最後校對日期（ISO 日期字串）
- `status`: `published | draft | archived`
- `sources`: 來源陣列（至少 1 筆）

選填：

- `itemLevel`
- `coverImage`
- `videos`

## 內容政策

- 本站僅做重點摘要，不完整轉載外部攻略。
- 每篇內容應附上官方或社群原始連結。
- 以 `lastVerifiedAt` 管理改版後可用性。

## 部署

`master` 分支 push 後，`pages.yml` 會執行：

1. `npm ci`
2. `npm run check`
3. `npm run test`
4. `npm run build`
5. 部署 `dist/` 到 GitHub Pages

若是 PR，只執行檢查與建置，不部署。

## 改版更新清單（手動）

每次遊戲大版本/小版本更新後：

1. 盤點受影響副本與篇章
2. 逐篇修正機制、站位、減傷安排
3. 更新 `patch` 與 `lastVerifiedAt`
4. 在 `/updates/` 檢查排序與可見性
