---
title: "【範例】圖文影音混合頁（Sample）"
slug: "sample-media-rich"
dutyType: "extreme"
patch: "sample"
encounter: "SAMPLE"
summary: "這是一篇專案內示範用的內容頁，包含本地圖片、本地影片、外部圖片連結與外部影片嵌入，方便確認 Markdown 與 HTML 混排時的顯示效果。"
tags:
  - "範例"
  - "圖文"
  - "影音"
lastVerifiedAt: "2026-02-13"
status: "published"
sources:
  - title: "Sample Local Media"
    url: "https://shadowkai0121.github.io/FFXIV-zhCT-Dungeon-Note/media-sample/"
    source: "community"
    note: "本地素材來源頁。"
  - title: "YouTube Embed Example"
    url: "https://www.youtube.com/watch?v=kgiuQwzB6aU"
    source: "video"
---

## 開場摘要

這頁示範四種媒體內容在攻略 Markdown 內的寫法與顯示方式。

## 本地圖片範例

使用 `public/` 靜態檔的絕對路徑（含專案 `base`）：

<img
  src="/FFXIV-zhCT-Dungeon-Note/media-sample/local-demo.svg"
  alt="本地示範圖片"
  loading="lazy"
  style="display:block;width:100%;max-width:900px;border:1px solid #d9d4c7;border-radius:12px;"
/>

## 外部圖片連結與預覽

- 外部圖片連結：
  <https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Final_Fantasy_XIV_at_Gamescom_2019_%2848461822276%29.jpg/1280px-Final_Fantasy_XIV_at_Gamescom_2019_%2848461822276%29.jpg>

下方直接預覽同一張外部圖片：

![外部圖片預覽](https://huiji-public.huijistatic.com/ff14/uploads/9/9f/112563.png)

## 本地影片範例

<video controls preload="metadata" style="display:block;width:100%;max-width:900px;border:1px solid #d9d4c7;border-radius:12px;background:#000;">
  <source src="/FFXIV-zhCT-Dungeon-Note/media-sample/local-demo.mp4" type="video/mp4" />
  你的瀏覽器不支援 HTML5 影片播放。
</video>

## 外部影片連結嵌入（YouTube）

- 外部影片原始連結：<https://www.youtube.com/watch?v=kgiuQwzB6aU>

<div style="position:relative;width:100%;max-width:900px;padding-top:56.25%;border:1px solid #d9d4c7;border-radius:12px;overflow:hidden;background:#000;">
  <iframe
    src="https://www.youtube.com/embed/kgiuQwzB6aU"
    title="外部影片嵌入範例"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
  ></iframe>
</div>

## 備註

- 這篇是 `sample` 目錄測試資料，建議維持 `draft`。
- 若要改成正式攻略，請更新 `slug`、`patch`、`encounter`、`status` 與 `sources`。
