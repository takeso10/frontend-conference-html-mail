# frontend-conference-html-mail

HTML メールのダークモードを題材にした、勉強会 LT 用のデモリポジトリです。
同じ内容のメールを「ダメな実装」と「うまくいく実装」の 2 通で用意し、
メールクライアントのダークモードで並べて比較できるようにしています。

架空のサービス「Sample」の認証コードのメールを題材にしています。
中身はロゴ画像・本文・罫線・フッターだけの最小構成です。

## セットアップ

```bash
pnpm install
pnpm dev     # http://localhost:3141 でプレビュー
pnpm build   # dist/ に HTML を出力
```

> プレビューと実際のメールクライアントの表示は別物です。
> ダークモードの検証は、必ず実際に送信して各クライアントで確認してください。

## 2 つのテンプレート

| | 中身 |
| --- | --- |
| `src/templates/MailBad` | Web と同じ感覚で書いたメール。Apple Mail では一応それらしく見えるが、Gmail と Outlook デスクトップで崩れる |
| `src/templates/MailGood` | 同じ内容を、壊れ方を設計して書き直したもの |

## 何がダメで、どう直したか

| # | ダメな実装 | 何が起きるか | 直し方 |
| --- | --- | --- | --- |
| 1 | ダーク対応が `@media (prefers-color-scheme: dark)` だけ | Gmail は `prefers-color-scheme` 非対応、Outlook デスクトップは `@media` 自体に非対応。丸ごと届かない | 届かない前提で、インラインに静的値を残す |
| 2 | `[data-ogsc]` でも CSS 変数を再定義する | Outlook.com は CSS 変数に非対応なので、変数を書き換えても効かない | `[data-ogsc]` には変数ではなく実際の色を直接書く |
| 3 | `<meta name="color-scheme">` がない | 自動変換するクライアントに、両モード対応済みだと伝えられない | `color-scheme` と `supported-color-schemes` を宣言する |
| 4 | 背景色をどこにも指定しない | 背景がクライアントの自動変換任せになり、文字色との組み合わせが破綻する | ページ背景・カード背景を静的値で必ず持たせる |
| 5 | ロゴをインライン SVG にし、`@media` で色を切り替える | Gmail は `<svg>` を除去し、Outlook デスクトップも描画しないので、ロゴごと消える | 白い板と余白を焼き込んだ PNG にする |
| 6 | 色指定が `var()` 単独 | `var()` を解釈できないクライアントは、そのプロパティごと捨てる。背景や色が落ちる | shorthand で静的値 → longhand で `var()` の順に二重で書く |
| 7 | `border: none` のあとに `border-top: 1px solid var(...)` | `var()` を含む `border-top` が捨てられ、`border: none` だけが残って罫線が消える | `border-top` を静的値で書き、`border-top-color` を `var()` で上書きする |

## MailGood の方針

**静的値を先に書き、CSS 変数で後から上書きする。**

CSS は後に書いたほうが勝ちます。`var()` を解釈できないクライアントは `var()` を含む
プロパティごと捨てるので、先に書いた静的値が残ります。

```tsx
<Hr
  style={{
    border: 'none',
    borderTop: `1px solid ${light.border}`,              // 静的値
    borderTopColor: `var(--border, ${light.border})`,    // 解釈できる環境だけ上書き
  }}
/>
```

React の style オブジェクトには同じキーを 2 回書けないため、
**shorthand と longhand の組**を使うのがポイントです。

| shorthand（静的値） | longhand（`var()` で上書き） |
| --- | --- |
| `background` | `backgroundColor` |
| `border` / `borderTop` | `borderColor` / `borderTopColor` |

### `var(--x, fallback)` の fallback は当てにならない

`var()` の第 2 引数は「変数が未定義のとき」に使われる値です。
`var()` そのものを解釈できないクライアントには、fallback も含めてプロパティごと無視されます。
だから二重宣言が必要になります。

### `color` だけは二重宣言できない

`color` には対応する shorthand がありません。そのため `color: var(--text-primary, #16181A)`
と単独で書くしかなく、`var()` を読めないクライアントでは色指定ごと落ちます。

ここは自動変換に委ねる前提で設計します。**背景色を静的値で固定しておくこと**が、
その自動変換の結果を破綻させないための備えになります。

## 実装上の注意

### react-email の `Body`

渡した style を内側の `<td>` にも複製する一方で、`className` は `<body>` にしか付けません。
`Body` に背景色を渡すと内側だけライトのまま取り残されるため、
ページ背景はラッパーの `Section` 側に持たせています。

### `[data-ogsc]` が付く条件

Outlook.com は、インラインの `color` を変換した要素にだけ `data-ogsc` を付けます
（`background-color` の場合は `data-ogsb`）。
祖先に `color` が一つも無いと `[data-ogsc] .text-primary` がどこにも当たらないため、
ラッパーの `Section` に基準色を持たせています。

## クライアント対応状況

| クライアント | CSS 変数 | `prefers-color-scheme` |
| --- | --- | --- |
| Apple Mail | ○ | ○ |
| Outlook.com | ✕ | ○（変換した要素に `[data-ogsc]` が付く） |
| Outlook macOS 16.80 / iOS / Android | ✕ | ○ |
| Gmail（全プラットフォーム） | ✕（`var()` 関数のみ解釈） | ✕ |
| Yahoo（全プラットフォーム） | ✕ | ✕（`@media ()` に書き換えられる） |
| Outlook Windows デスクトップ | ✕ | ✕ |

出典: [caniemail](https://www.caniemail.com/)（CSS variables / prefers-color-scheme）。
データには収録時点があるため、実送信での確認と合わせて判断してください。

## 画像

`public/` の PNG を jsDelivr 経由で配信しています。
メールクライアントはローカルファイルを読めないため、画像は公開 URL である必要があります。

- `logo-transparent.png` — 透過 PNG。ダークモードで沈む例（現在はテンプレートから未使用）
- `logo-plate.png` — 白い板と余白を焼き込んだもの。どちらのモードでも同じ見え方になる
