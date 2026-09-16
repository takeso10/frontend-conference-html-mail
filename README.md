# frontend-conference-html-mail

HTML メールのダークモードを題材にした、勉強会 LT 用のデモリポジトリです。
同じ内容のメールを「ダメな実装」と「うまくいく実装」の 2 通で用意し、
メールクライアントのダークモードで並べて比較できるようにしています。

架空のサービス「Lumina」の登録完了メールを題材にしています。
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
| 1 | ダーク対応が `@media (prefers-color-scheme: dark)` だけ | Gmail は `prefers-color-scheme` 非対応、Outlook デスクトップは `@media` 自体に非対応。丸ごと届かない | 静的値を前提にしたうえで、`@media` と `[data-ogsc]` の 2 系統で上書きする |
| 2 | 上書きを CSS 変数でやる | Outlook.com は CSS 変数に非対応。Gmail は `var()` 関数は読むが変数宣言を落とすので、値が入らない | 変数を挟まず、上書き先に実際の色を書く |
| 3 | `<meta name="color-scheme">` がない | 自動変換するクライアントに、両モード対応済みだと伝えられない | `color-scheme` と `supported-color-schemes` を宣言する |
| 4 | `<body>` に背景色を指定しない | 背景がクライアントの自動変換任せになり、文字色との組み合わせが破綻する | ページ背景をラッパー要素に静的値で必ず持たせる |
| 5 | 透過 PNG のロゴを置く | 背景だけが反転し、濃い色のロゴが沈んで読めなくなる | 白い板と余白を焼き込んだ PNG にする。SVG は Gmail が非対応なので使えない |
| 6 | 色指定が `var()` 単独 | `var()` を解釈できないクライアントは、そのプロパティごと捨てる。色が落ちる | インラインには常にライトの静的値を書く |
| 7 | `border: none` のあとに `border-top: 1px solid var(...)` | `var()` を含む `border-top` が捨てられ、`border: none` だけが残って罫線が消える | `border-top` を静的値で持たせ、上書きは class 側で当てる |

### `var(--x, fallback)` の fallback は当てにならない

`var()` の第 2 引数は「変数が未定義のとき」に使われる値です。
`var()` そのものを解釈できないクライアントには、fallback も含めてプロパティごと無視されます。

```css
/* Outlook デスクトップ / Yahoo ではこの行がまるごと消える */
color: var(--text-primary, #16181A);
```

## MailGood の方針

2 行で言えます。

1. インラインスタイルには必ずライトモードの静的値を書く（これが最後の砦）
2. ダーク時の上書きは `<style>` 内の class + `!important` で当てる

`!important` がないとインラインスタイルに負けるため必須です。
CSS 変数を使わないのは、変数が効くクライアント（実質 Apple Mail のみ）より、
class での上書きが効くクライアントのほうが広いからです。

### 実装上の注意

react-email の `Body` は、渡した style を内側の `<td>` にも複製する一方で、
`className` は `<body>` にしか付けません。
`Body` に背景色を渡すと内側だけライトのまま取り残されるため、
ページ背景はラッパーの `Section` 側に持たせています。

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

- `logo-transparent.png` — 透過 PNG。ダークモードで沈む例
- `logo-plate.png` — 白い板と余白を焼き込んだもの。どちらのモードでも同じ見え方になる
