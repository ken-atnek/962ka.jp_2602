# WebGL ディストーションイメージ

## 概要

Three.js（WebGL）と GSAP を使った、スクロール連動の画像歪みエフェクト。  
参考実装: [ChillySourceTokyo](https://chillysourcetokyo.com/) の `index-works__list` 内サムネイル。

**動作:**
- スクロールで画像がビューに入ると、3D に傾きグニャグニャに歪んだ状態からフラットに解消される
- ホバーでわずかに歪みが戻る
- ビューを外れると元の歪み状態に戻る（再スクロールで再生）

---

## ファイル構成

| ファイル | 役割 |
|---|---|
| `src/components/common/DistortionImage.tsx` | メインコンポーネント |
| `src/components/common/DistortionImage.module.scss` | canvas の配置スタイル |

---

## 使い方

```tsx
import DistortionImage from '@/components/common/DistortionImage';

<div className={styles.itemImage}>
  <DistortionImage
    src="/images/example.webp"
    alt="画像の説明"
    cameraFar={2}
    cameraNear={0.94}
    firstDistortion={200}
  />
</div>
```

### Props

| Prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `src` | `string` | 必須 | 画像パス |
| `alt` | `string` | 必須 | アクセシビリティ用テキスト（`aria-label` に使用） |
| `cameraFar` | `number` | `2` | 初期カメラ距離の倍率（大きいほど遠くから始まる） |
| `cameraNear` | `number` | `0.94` | 最終カメラ距離の倍率（`1.0` でピッタリサイズ、小さいほどズームイン） |
| `firstDistortion` | `number` | `200` | 初期歪み強度（大きいほど激しく歪む） |
| `className` | `string` | - | コンテナへの追加クラス |

### チューニング例

| 変えたい表現 | 調整 |
|---|---|
| より激しく歪ませたい | `firstDistortion={300}` ～ `{400}` |
| ズームを抑えたい | `cameraNear={1.0}` に近づける |
| 遠くからズームインしてくる感じを強める | `cameraFar={3}` などに上げる |

---

## 親コンテナの必須設定

**コンテナに `aspect-ratio` または明示的な `height` が必要。**  
`DistortionImage` は `getBoundingClientRect()` でコンテナのサイズを取得して canvas を生成するため、高さが決まっていないと正しく動作しない。

```scss
// 良い例
.itemImage {
  width: 53vw;
  aspect-ratio: 576 / 431; // 画像の実寸で指定
}

// NG（高さが自動で 0 になる）
.itemImage {
  width: 53vw;
  // height / aspect-ratio なし
}
```

---

## 技術構成

### レンダリング

```
ブラウザ
 └── Three.js
      └── WebGLRenderer（GPU で描画）
           └── <canvas>（overflow: hidden で親サイズに収まる）
```

- canvas のサイズはコンテナの **1.1倍**（3D 回転中に端が白くならないバッファ）
- `overflow: hidden` + `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` で中央配置

### シェーダー（GLSL）

頂点シェーダーで Z 座標を波打たせている:

```glsl
float n = (sin(uv.x * 5.0 + time) + cos(uv.y * 1.5 + time)) * distortionLevel;
float z = position.z + n;
```

- `distortionLevel = 0` → 平面（歪みなし）
- `distortionLevel = 200` → 激しく波打つ
- `time` は RAF ループで毎フレーム `+0.01` され、波が流れるように動く
- メッシュの頂点数: `PlaneGeometry(w, h, 25, 25)` → 25×25 = 625 頂点が GPU で並列処理される

### カメラ距離の計算

`cameraFar` / `cameraNear` は `rect.width` の倍率ではなく、**FOV から逆算した exactFitZ の倍率**。  
これにより縦長・横長を問わずズーム量が均一になる。

```ts
const fovRad = (45 * Math.PI) / 180;
const exactFitZ = stageHeight / (2 * Math.tan(fovRad / 2));
const farZ = exactFitZ * cameraFar;   // 初期カメラ位置
const nearZ = exactFitZ * cameraNear; // 最終カメラ位置
```

### アニメーション

| タイミング | GSAP アニメーション |
|---|---|
| スクロール IN（200ms 後） | `distortionLevel → 0`（1.2s power2.inOut）、rotation → `(0,0,0)`（1.2s power2.out）、camera.z → nearZ（1.5s power2.out）|
| スクロール OUT | 上記の逆 |
| hover | `distortionLevel → 20`（1.2s power2.out） |
| mouseleave | `distortionLevel → 0`（1.2s power2.out） |

### パフォーマンス最適化

- ビュー外では RAF の描画を **10フレームに1回**に落とす（`frameCountRatio = 10`）
- ビュー内では **2フレームに1回**に上げる
- テクスチャ読み込みは**初回スクロールINのみ**（`oneShot` フラグ）
- アンマウント時に `renderer.dispose()`・RAF キャンセル・IntersectionObserver 切断

---

## 注意事項

- `'use client'` 必須（Three.js は SSR 非対応）
- `next.config.ts` の `output: 'export'` と互換あり（クライアントサイドのみで動作）
- タッチデバイスでは hover は発火しないが、スクロールアニメーションは正常動作する
- WebGL 非対応ブラウザでは canvas が空白になる（フォールバックは未実装）
