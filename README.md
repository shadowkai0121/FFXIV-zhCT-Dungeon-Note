# Hello GitHub Pages (Static)

這是一個最小可部署到 GitHub Pages 的靜態網站範例，透過 GitHub Actions 自動部署。

## 專案結構

- `index.html`
- `assets/style.css`
- `assets/app.js`
- `.github/workflows/pages.yml`

## 部署流程

`pages.yml` 在 `master` 分支有新 commit 時會：

1. Checkout 原始碼
2. 產生 `dist/`（並注入 commit SHA 到 `index.html`）
3. 透過 `actions/upload-pages-artifact` 上傳產物
4. 透過 `actions/deploy-pages` 部署到 GitHub Pages

## Pages 設定

若 repository 尚未設定為 GitHub Actions 來源，請到：

`Settings -> Pages -> Build and deployment -> Source: GitHub Actions`
