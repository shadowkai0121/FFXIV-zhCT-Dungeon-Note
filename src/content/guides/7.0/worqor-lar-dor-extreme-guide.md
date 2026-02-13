---
title: "【FF14】艷翼蛇鳥殲殛戰（極）攻略｜宏與時間軸（中文翻譯）"
slug: "worqor-lar-dor-extreme-guide"
dutyType: "extreme"
patch: "7.0"
encounter: "EX1"
summary: "本文為 Game8《極ヴァリガルマンダ討滅戦》中文翻譯整理版，包含巨集、分階段機制、時間軸與常見失誤。"
tags:
  - "極神"
  - "艷翼蛇鳥殲殛戰"
  - "7.0"
lastVerifiedAt: "2026-02-13"
status: "published"
sources:
  - title: "Game8｜極ヴァリガルマンダ討滅戦の攻略｜マクロ"
    url: "https://game8.jp/ff14/622480"
    source: "community"
  - title: "Icy Veins｜Worqor Lar Dor Extreme Trial Guide"
    url: "https://www.icy-veins.com/ffxiv/worqor-lar-dor-extreme-trial-guide"
    source: "community"
  - title: "ハムカツ｜極ヴァリガルマンダ攻略動画"
    url: "https://www.youtube.com/watch?v=nI_L-b80b10"
    source: "community"
---

## 開場摘要

#### 本文內容翻譯自 Game8（頁面最後更新：2025-11-21 05:16 JST）
#### 另補充參考 Icy Veins 同主題攻略（頁面顯示最後更新：2024-07-01）。
#### 戰鬥流程
```
flowchart TD
  S([開始])

  %% 火階段
  subgraph P1[火階段]
    P1_1[冰柱突刺]
    P1_2[擁有生命的天災]
    P1_3[三重災變]
    P1_4[火山噴發]
    P1_5[動作判定 AOE]
    P1_6[山火]
    P1_7[三重災變 Debuff 收尾]
    P1_8[災禍領域]
    P1_9[災禍徵兆]
    P1_10[圖拉爾災禍]
    P1_11[擁有生命的天災（產生差分機制）]

    P1_1 --> P1_2 --> P1_3 --> P1_4 --> P1_5 --> P1_6 --> P1_7 --> P1_8 --> P1_9 --> P1_10 --> P1_11
  end

  %% 雷階段
  subgraph P2[雷階段]
    P2_1[三重災變]
    P2_2[火 Debuff 4:4]
    P2_3[驟羽]
    P2_4[災厄落雷]
    P2_5[雷冰 Debuff]
    P2_6[動作判定 AOE]
    P2_7[雷鳴吐息]
    P2_8[災禍領域]
    P2_9[災禍衝]

    P2_1 --> P2_2 --> P2_3 --> P2_4 --> P2_5 --> P2_6 --> P2_7 --> P2_8 --> P2_9
  end

  %% 冰階段
  subgraph P3[冰階段]
    P3_1[三重災變]
    P3_2[火冰 Debuff]
    P3_3[雪崩]
    P3_4[雷 Debuff]
    P3_5[冰柱突刺 + 雪崩]
    P3_6[結冰塵]
    P3_7[災禍領域]
    P3_8[冰爪]

    P3_1 --> P3_2 --> P3_3 --> P3_4 --> P3_5 --> P3_6 --> P3_7 --> P3_8
  end

  %% 最終階段
  subgraph P4[最終階段]
    P4_1[怒不可遏]
    P4_2[山火]
    P4_3[圖拉爾災禍（連續）]
    P4_4[時間切]

    P4_1 --> P4_2 --> P4_3 --> P4_4
  end

  S --> P1_1 --> P2_1 --> P3_1 --> P4_1
```

### 巨集（ハムカツ式）

```text
/p ■風 災禍（雷冰） |■嘴砲(扇)
/p MT/D1　ST/D2 　|　MT/D1／＼ST/D2
/p H1/D3　H2/D4　 |H1/D3／　　＼H2/D4
/p ■蓄力(前足)
/p H1/D3　MT/D1　ST/D2　H2/D4
/p ■山火 奇數:MT　偶數:ST
/p ■災禍徵兆
/p 西：MTH1D1D3　東：STH2D2D4
/p ■災禍（火冰）
/p 西北 MT　東北 ST
/p 分攤:西 H1D1D3　東 H2D2D4
```

### 場地標記範例

![場地標記範例](https://img.game8.jp/10207744/71dc7dfa46f6ce8eb02be5802fe4d165.png/show)

#### `1/2/3/4` 常用於雙人分攤定位。
#### `A/B` 主要用於 `冰柱突刺`（アイシクルスパイク）與冰階段雪崩複合機制。

## 隊伍配置與裝備

#### 人數配置：8 人（T2/H2/D4）。
#### 進場條件：戰鬥/魔法職 Lv100，建議平均 IL 690+，限時 60 分鐘。
#### 代幣：每次通關可取得 1 枚，10 枚可於 Solution Nine 兌換 IL710 武器。
#### 建議攜帶最新食物與爆發藥，並先確認團隊減傷軸（特別是火階段與最終階段）。

## 機制拆解

### Phase 1（火階段）

#### `冰柱突刺`（アイシクルスパイク）：先曲線預兆，再曲線 AOE，最後冰塊爆炸成圓形。預兆左->右時從 A 前起跑；右->左時從 B 前起跑。
  <video controls preload="none" src="https://img.game8.jp/10205759/8ff49090f462dd1ab2599e47c3210642.mp4/show"></video>

#### `擁有生命的天災`（リビングディザスター）：全場傷害並切換屬性，首輪固定進火階段。
  | 火 | 雷 | 冰 |
  |:---:|:---:|:---:|
  | ![擁有生命的天災示意1](https://img.game8.jp/10205710/329b5e297f859a8a85d1c7b8c4a0518a.jpeg/show) | ![擁有生命的天災示意2](https://img.game8.jp/10205709/dd3cf27ab4b9adafad8ce324551ca578.jpeg/show) | ![擁有生命的天災示意3](https://img.game8.jp/10205711/92e2841ae627d01750d25f6506c07893.jpeg/show)|

#### `三重災變`（トライスカージ）：全員吃全場傷害並附加火/雷/冰 Debuff，效果隨當前階段改變。
  | 火 | 雷 | 冰 |
  |:---:|:---:|:---:|
  | ![三重災變火](https://img.game8.jp/10207530/ede720b6f54149441270b904676a3b3b.png/show) | ![三重災變雷](https://img.game8.jp/10207531/a42919357c9888bec90092c664af6a9b.png/show) | ![三重災變冰](https://img.game8.jp/10205774/2840eb915f41e54af2d8fefa5c7fe25e.png/show) |
  | 3次連續分傷 | 散開 | debuff 結束前保持移動 |

##### 三重災變：冰
頭頂會顯示冰標記，當標記倒數歸零時若保持移動狀態即可避開攻擊。

##### 三重災變：火
針對治療者的連續三次分傷攻擊。每次命中後地面會殘留範圍效果，需要邊前進邊進行分傷。此外，第三次分傷結束後會觸發冰屬性減益效果，目標者需持續移動以避開。
火焰減益效果的分傷傷害極高，且需邊移動邊處理機制使得治療操作困難。針對首領使用的減傷技能（如「復甦者」）在此無效，請改用坦克的範圍減傷或遠程職的範圍減傷技能。若於開場「擁有生命的天災」詠唱前半段施放，可恰好在90秒減傷冷卻時間結束時再次使用。

1. 由於標記會顯示在頭頂，請在技能發動前移動至巨集指令的散開位置。
  ![](https://img.game8.jp/10208144/40ad1c7d641321bade078be33619ec4d.png/original)
1. 首次分傷將啟動。由於地面會殘留範圍效果，請向前方移動
  ![](https://img.game8.jp/10208145/cfe853c77527a0416bfe2cb2497abd3f.png/original)
1. 第二次分傷將啟動。請繼續向前推進。
  ![](https://img.game8.jp/10208143/95186f656d644b307bd659dd3cef6c8b.png/original)
1. 第三次分傷將啟動。當第三次分傷啟動時，請向左右移動。
  ![](https://img.game8.jp/10208141/ebab6f2beaddfad319d810b05ec15210.png/original)
1. 冰 debuff 將發動。請持續移動以閃避攻擊。
  ![](https://img.game8.jp/10208142/2c3be91fc96242cf682ec43964849a5c.png/original)

##### 三重災變：雷
![](https://img.game8.jp/10208181/02142a4f3e32a41ce3883b06f74ad41b.png/original)

#### `火山彈`（火山の噴火）：東或西火山爆發大圈，後續隨機腳下小圈，先遠離噴發側再二次走位。
  <video controls preload="none" src="https://img.game8.jp/10205754/8ae16de477cececed9d13980bf934498.mp4/show"></video>

#### 動作判定 AOE：依王動作決定鋼鐵/月環/扇形，並伴隨分攤；後半不再顯示文字提示。
  | 蛇行盤繞(月環) | 蛇行強襲(鋼鐵) | 蛇行吐息(扇形) |
  |:---:|:---:|:---:|
  |艷翼蛇鳥的周圍聚起了風…|艷翼蛇鳥正在積蓄力量…|艷翼蛇鳥的口中匯聚了魔力…|
  |王周圍纏繞著風|王的雙手發光|王的嘴巴發光(靠夭是嘴砲)|
  |![](https://img.game8.jp/10205719/81e3a58af0ab89669756b0854b424666.jpeg/original)|![](https://img.game8.jp/10205720/4fa329f427a7da5e006915ff2147b9b4.jpeg/original)|![](https://img.game8.jp/10205720/4fa329f427a7da5e006915ff2147b9b4.jpeg/original)|
  |![月環站位](https://img.game8.jp/10207746/e325184b10fa7318631377388768c519.png/original)|![鋼鐵站位](https://img.game8.jp/10207743/4fbf2d12819f0573c084673971429e01.png/original)|![扇形站位](https://img.game8.jp/10207745/d44e4d12108c5cf3e21038e3f5f52b0c.png/original)|

#### `山火`（マウンテンファイア）：對塔連續 6 次重擊，奇數 MT、偶數 ST 入塔，其餘人在塔後避傷害。
  |1|2|3|
  |:---:|:---:|:---:|
  |![](https://img.game8.jp/10208123/292d59a6369304f81d9bf6a79042c16b.png/original)|![](https://img.game8.jp/10208122/a78dea8d027f4c3d66d239c1695c50b6.png/original)|![](https://img.game8.jp/10208121/2694844a15c9e6593eae1706de511f84.png/original)|

  |4|5|6|
  |:---:|:---:|:---:|
  |![](https://img.game8.jp/10208664/fae97e35ccdd3103ffe4a3ed72ab5d22.png/original)|![](https://img.game8.jp/10208121/2694844a15c9e6593eae1706de511f84.png/original)|![](https://img.game8.jp/10208122/a78dea8d027f4c3d66d239c1695c50b6.png/original)|

#### `災禍領域`（ディザスターゾーン）：全場傷害並結束屬性階段。

#### `災禍徵兆`（ディザスターサイン）：4:4 分組吃連續分攤並破壞三楔，先頭承傷建議由坦克承接。
  ![災禍徵兆](https://img.game8.jp/10208455/5aa9b967c11b3310b6ca62bd904c62c1.png/show)

#### `圖拉爾災禍`（トラルディザスター）：長詠唱後冰->雷->火連續全場傷害，減傷要分段覆蓋。

### Phase 2（雷階段）
發動 `擁有生命的天災`（リビングディザスター）之後場地分為3×4正方形，其中四角和中間合計六塊正方形區域為較為明亮的青綠色，接觸該區域時會獲得![](https://huiji-public.huijistatic.com/ff14/uploads/7/74/215037.png)浮空

#### `三重災變`（トライスカージ）在雷階段常見處理：
| 火 | 雷 | 冰 |
|:---:|:---:|:---:|
| ![三重災變火](https://img.game8.jp/10207530/ede720b6f54149441270b904676a3b3b.png/show) | ![三重災變雷](https://img.game8.jp/10207531/a42919357c9888bec90092c664af6a9b.png/show) | ![三重災變冰](https://img.game8.jp/10205774/2840eb915f41e54af2d8fefa5c7fe25e.png/show) |
| 4:4 分傷 | 散開 | 依浮空/地板規則處理 |
|![](https://img.game8.jp/10208477/fca4804fff7dd56626b64de62b210f08.png/original)| ![](https://img.game8.jp/10208493/3d8932c66ea359f4215bda5eea732263.png/original) | 使用浮空迴避 |

#### `驟羽`（フェザーヘイル）：連續距離衰減並生成羽毛，需依第一輪落點判斷要破哪根羽毛。
| 東起手 | 西起手 |
|:---:|:---:|
|![](https://img.game8.jp/10208484/6bc415e5e52db1ab206bbaab5abbb249.png/original)|![](https://img.game8.jp/10208485/8ab8ab89fb8c47166c494a180d253fe3.png/original)|

#### `災厄落雷`（災厄の落雷）：在羽毛位置落雷，先決定待機點再輸出。
![災厄落雷](https://img.game8.jp/10205776/aeb2ba8396794d561d627c4e47e53dbe.jpeg/original)

#### 動作判定 AOE：依王動作決定鋼鐵/月環/扇形，並伴隨腳下黃圈；不再顯示文字提示。
| 蛇行盤繞(月環) | 蛇行強襲(鋼鐵) | 蛇行吐息(扇形) |
|:---:|:---:|:---:|
|王周圍纏繞著風|王的雙手發光|王的嘴巴發光(靠夭是嘴砲)|
|![](https://img.game8.jp/10208502/eac952d99f1575a2c9777586908aabfa.png/original)|![](https://img.game8.jp/10208501/eff989d3c0fffdcd75b3521dddd2d7c1.png/original)|![](https://img.game8.jp/10208503/3f0368b75adb5e5007b7f0fdfb161388.png/original)|

#### 雷冰雙 Debuff 同時發動：雷圈大，建議站格中央；第二輪與搭檔交換位置。
  ![雷冰雙Debuff](https://img.game8.jp/10208493/3d8932c66ea359f4215bda5eea732263.png/original)

#### `雷鳴吐息`（サンダーブレス）：左右雷球直線 + 王大扇形，需同時看雷球與王面向。
<video controls preload="none" src="https://img.game8.jp/10205761/a5a8bd499f5ea62a2b0bd97c3fecd8c2.mp4/show"></video>

#### `災禍衝`（カラミティダイヴ）：中央雙坦分攤塔後接擊退，可用防擊退。
<video controls preload="none" src="https://img.game8.jp/10205779/7f0a04b3284890e2bcb941ed76cc5f55.mp4/show"></video>

### Phase 3（冰階段）
艷翼蛇鳥面前出現雪山的小型模型，發動全體攻擊，造成冰屬性魔法傷害，賦予受到傷害的玩家12秒![](https://huiji-public.huijistatic.com/ff14/uploads/f/fe/215525.png)凍傷，隨後場地變為雪山。

#### `三重災變`（トライスカージ）在冰階段常見處理：
| 火 | 雷 | 冰 |
|:---:|:---:|:---:|
| ![三重災變火](https://img.game8.jp/10207530/ede720b6f54149441270b904676a3b3b.png/show) | ![三重災變雷](https://img.game8.jp/10207531/a42919357c9888bec90092c664af6a9b.png/show) | ![三重災變冰](https://img.game8.jp/10205774/2840eb915f41e54af2d8fefa5c7fe25e.png/show) |
| 3:3 分傷 | 散開 | 坦克大傷害||

##### 火冰雙 Debuff 同發：坦克把冰圈帶到前側外緣，治療火 Debuff 與 DPS 3:3 分攤。
![火冰雙Debuff](https://img.game8.jp/10208704/72e217880e262a06c0081c89802c582c.png/original)

##### 雷
![](https://img.game8.jp/10208897/ddaf7b98bed45ccbdceb502755075a7f.png/original)

#### 雪崩 + 動作判定 AOE：同時看雪崩方向與王範圍，跑向交集安全區。
火焰階段時會施展附帶提示訊息的範圍攻擊。但本次不會顯示提示訊息，請觀察首領動向進行閃避。
範圍攻擊發動的同時，會從提示訊息顯示的方向發動雪崩攻擊，請衝向瓦利加曼達的範圍與雪崩範圍之間。
冰霜階段時，戰場上會出現多個冰晶特效，並形成A標記或B標記為安全區域的範圍。請觀察冰晶特效位置衝向安全區域。

<video controls preload="none" src="https://img.game8.jp/10205772/f5e813b423d576a5b6a09070ac778990.mp4/show"></video>

| A點安全區配置 | B點安全區配置 |
|:---:|:---:|
| ![](https://img.game8.jp/10208845/e4e1fea7334dc5462cda4e79886be6ac.png/show) | ![](https://img.game8.jp/10208847/6fe3891c0a8cb8bcd97ee37d365a8002.png/show) |

#### `冰柱突刺` + 雪崩複合：需邊修正站位邊回避，貪固定點容易吃到雪崩。
<video controls preload="none" src="https://img.game8.jp/10205769/f8740035ccd9d289455460679a80d430.mp4/show"></video>

#### `結冰塵`（フリジングダスト）：持續移動即可處理。

#### `冰爪`（アイスタロン）：仇恨第 1/2 位強攻，ST 要提前穩住 2 仇。

### Phase 4（最終階段）

#### `怒不可遏`（ラース・アンファールド）：單純全場傷害，按計畫交減傷。
#### `山火`（マウンテンファイア）：與前半同型，但此時坦克冷卻壓力更高。
#### `圖拉爾災禍`（トラルディザスター）：連續全場後接時間切。

## 常見失誤

#### `三重災變` 二輪交換位置時慢半拍，導致雷圈重疊或分攤缺人。
#### 火階段 `山火` 塔次數與坦克輪替節奏錯位，導致塔漏吃或坦克暴斃。
#### 冰階段把 `冰柱突刺 + 雪崩` 當成單機制處理，忽略「先避曲線再修正防雪崩」的二段走位。
