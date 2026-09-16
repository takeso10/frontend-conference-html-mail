import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Text,
} from '@react-email/components';
import { FC } from 'react';
import { dark, fontFamily, light, logos } from '../../styles/theme';

/**
 * うまくいく例。MailBad と内容は同じで、実装だけを直したもの。
 *
 * 方針は 2 行で言える。
 *   1. インラインスタイルには必ずライトモードの静的値を書く（これが最後の砦）
 *   2. ダーク時の上書きは <style> 内の class + !important で当てる
 */

/**
 * ライトとダークの色は必ず対で持つ。片方だけ変えると、文字と背景のどちらかが
 * 取り残されて読めなくなるため。
 */
const darkRules = [
  { selector: '.text-primary', property: 'color', value: dark.textPrimary },
  { selector: '.text-secondary', property: 'color', value: dark.textSecondary },
  { selector: '.bg-page', property: 'background-color', value: dark.bgPage },
  { selector: '.bg-card', property: 'background-color', value: dark.bgCard },
  { selector: '.hr', property: 'border-top-color', value: dark.border },
  { selector: '.link', property: 'color', value: dark.link },
] as const;

/** !important を付けないとインラインスタイルに負けるので必須。 */
const toRules = (prefix: string) =>
  darkRules
    .map(
      ({ selector, property, value }) =>
        `  ${prefix}${selector} { ${property}: ${value} !important; }`,
    )
    .join('\n');

const style = [
  ':root { color-scheme: light dark; supported-color-schemes: light dark; }',
  // Apple Mail など、素直に CSS が届くクライアント向け。
  '@media (prefers-color-scheme: dark) {',
  toRules(''),
  '}',
  // Outlook.com 向け。勝手に色を変換したうえで、変換した要素に [data-ogsc] を付けてくる。
  // CSS 変数には非対応なので、変数ではなく実際の色を直接書く。
  toRules('[data-ogsc] '),
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
        {/* 背景色は静的値で必ず指定する。未指定だと自動変換の結果が読めなくなる。 */}
        <Section
          className="bg-page"
          style={{ backgroundColor: light.bgPage, padding: '40px 0' }}
        >
          <Section style={{ paddingBottom: '40px', textAlign: 'center' }}>
            {/* 白い板と余白を焼き込んだPNG。背景が反転しても沈まない。
                SVG は Gmail が非対応なので選択肢にならない。 */}
            <Img alt="Lumina" height={48} src={logos.plate} />
          </Section>

          <Container style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <Section
              className="bg-card"
              style={{
                backgroundColor: light.bgCard,
                borderRadius: '16px',
                padding: '40px',
              }}
            >
              <Heading
                className="text-primary"
                style={{
                  margin: 0,
                  fontSize: '24px',
                  lineHeight: 1.4,
                  color: light.textPrimary,
                }}
              >
                ご登録ありがとうございます
              </Heading>

              <Text
                className="text-primary"
                style={{
                  margin: '24px 0 0',
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: light.textPrimary,
                }}
              >
                Lumina のアカウント登録が完了しました。
                <br />
                下のリンクから最初の設定を進めてください。
              </Text>

              <Text style={{ margin: '16px 0 0', fontSize: '16px', lineHeight: 1.7 }}>
                <Link
                  className="link"
                  href="https://example.com/setup"
                  style={{ color: light.link }}
                >
                  初期設定をはじめる
                </Link>
              </Text>

              {/* border: none で潰さず、borderTop を静的値で持たせる。
                  上書きは class 側で当たるので、届かないクライアントでも罫線は残る。 */}
              <Hr
                className="hr"
                style={{
                  border: 'none',
                  borderTop: `1px solid ${light.border}`,
                  margin: '32px 0',
                }}
              />

              <Text
                className="text-secondary"
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: light.textSecondary,
                }}
              >
                このメールに心当たりがない場合は破棄してください。
              </Text>
            </Section>

            <Section style={{ padding: '32px 0 0', textAlign: 'center' }}>
              <Text
                className="text-secondary"
                style={{ margin: 0, fontSize: '12px', color: light.textSecondary }}
              >
                Lumina Inc.
              </Text>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default MailGood;
