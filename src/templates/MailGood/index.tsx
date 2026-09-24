import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Section,
  Text,
} from '@react-email/components';
import { FC } from 'react';
import { dark, fontFamily, light, logos } from '../../styles/theme';

/**
 * うまくいく例。MailBad と内容は同じで、実装だけを直したもの。
 *
 * 方針は 1 行で言える。
 *   静的値を先に書き、CSS 変数で後から上書きする。
 *
 * CSS は後に書いたほうが勝つ。var() を解釈できないクライアントは
 * var() を含むプロパティごと捨てるので、先に書いた静的値が残る。
 */

/** ライトとダークは必ず同じキーを対で持たせる。片方だけ変えると読めなくなるため。 */
const cssVariables = (scope: typeof light | typeof dark, indent: string) =>
  [
    `--text-primary: ${scope.textPrimary};`,
    `--text-secondary: ${scope.textSecondary};`,
    `--bg-page: ${scope.bgPage};`,
    `--bg-card: ${scope.bgCard};`,
    `--border: ${scope.border};`,
  ]
    .map((line) => `${indent}${line}`)
    .join('\n');

/**
 * Outlook.com は CSS 変数に非対応なので、変数を再定義しても効かない。
 * 色を変換した要素に付く [data-ogsc] を拾って、実際の色を直接指定する。
 * !important がないとインラインスタイルに負ける。
 */
const outlookComRules = [
  { selector: '.text-primary', property: 'color', value: dark.textPrimary },
  { selector: '.text-secondary', property: 'color', value: dark.textSecondary },
  { selector: '.bg-page', property: 'background-color', value: dark.bgPage },
  { selector: '.bg-card', property: 'background-color', value: dark.bgCard },
  { selector: '.hr', property: 'border-top-color', value: dark.border },
]
  .map(
    ({ selector, property, value }) =>
      `[data-ogsc] ${selector} { ${property}: ${value} !important; }`,
  )
  .join('\n');

const style = [
  ':root {',
  '  color-scheme: light dark;',
  '  supported-color-schemes: light dark;',
  cssVariables(light, '  '),
  '}',
  '@media (prefers-color-scheme: dark) {',
  '  :root {',
  cssVariables(dark, '    '),
  '  }',
  '}',
  outlookComRules,
].join('\n');

export const MailGood: FC = () => {
  return (
    <Html lang="ja">
      <Head>
        <meta content="width=device-width" name="viewport" />
        {/* 自動変換するクライアントに、両モードに対応済みだと宣言する。 */}
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
        <style>{style}</style>
      </Head>
      {/* Body は style を内側の <td> にも複製するが class は <body> にしか付かない。
          背景色をここに書くと内側だけライトのまま取り残されるので、
          ページ背景は下のラッパー Section 側に持たせる。 */}
      <Body className="bg-page" style={{ margin: 0, fontFamily }}>
        {/* background（shorthand）で静的値を置き、backgroundColor（longhand）で上書きする。
            プロパティ名が違うので、React の style オブジェクトでも両方を並べられる。 */}
        <Section
          className="bg-page text-primary"
          style={{
            background: light.bgPage,
            backgroundColor: `var(--bg-page, ${light.bgPage})`,
            // Outlook.com は inline の color を変換した要素にだけ data-ogsc を付ける。
            // 祖先に color が無いと [data-ogsc] の上書きがどこにも当たらない。
            color: `var(--text-primary, ${light.textPrimary})`,
            padding: '40px 0',
          }}
        >
          <Section style={{ paddingBottom: '40px', textAlign: 'center' }}>
            {/* 白い板と余白を焼き込んだPNG。背景が反転しても沈まない。
                SVG は Gmail が非対応なので選択肢にならない。 */}
            <Img alt="Sample" height={48} src={logos.plate} style={{ margin: '0 auto' }} />
          </Section>

          <Container style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <Section
              className="bg-card"
              style={{
                background: light.bgCard,
                backgroundColor: `var(--bg-card, ${light.bgCard})`,
                borderRadius: '16px',
                padding: '40px',
              }}
            >
              {/* color には shorthand が無いため、この二重宣言ができない。
                  var() を読めないクライアントでは色指定ごと落ちて、自動変換に委ねることになる。
                  だからこそ、背景色を静的値で固定しておくことが効いてくる。 */}
              <Text
                className="text-primary"
                style={{
                  margin: 0,
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: `var(--text-primary, ${light.textPrimary})`,
                }}
              >
                ログイン画面で、以下の認証コードを入力してください。
              </Text>

              <Text
                className="text-primary"
                style={{
                  margin: '24px 0 0',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  letterSpacing: '8px',
                  lineHeight: 1.2,
                  textAlign: 'center',
                  color: `var(--text-primary, ${light.textPrimary})`,
                }}
              >
                123456
              </Text>

              <Text
                className="text-secondary"
                style={{
                  margin: '24px 0 0',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: `var(--text-secondary, ${light.textSecondary})`,
                }}
              >
                このコードの有効期限は10分です。
              </Text>

              {/* borderTop（shorthand）で静的値を置き、borderTopColor（longhand）で上書きする。
                  MailBad のように borderTop 自体を var() にすると、捨てられて罫線が消える。 */}
              <Hr
                className="hr"
                style={{
                  border: 'none',
                  borderTop: `1px solid ${light.border}`,
                  borderTopColor: `var(--border, ${light.border})`,
                  margin: '32px 0',
                }}
              />

              <Text
                className="text-secondary"
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: `var(--text-secondary, ${light.textSecondary})`,
                }}
              >
                このメールに心当たりがない場合は、破棄してください。
              </Text>
            </Section>

            <Section style={{ padding: '32px 0 0', textAlign: 'center' }}>
              <Text
                className="text-secondary"
                style={{
                  margin: 0,
                  fontSize: '12px',
                  color: `var(--text-secondary, ${light.textSecondary})`,
                }}
              >
                Sample Inc.
              </Text>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default MailGood;
