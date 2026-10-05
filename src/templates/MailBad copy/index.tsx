import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Text,
} from '@react-email/components';
import { FC } from 'react';
import { colors, fontFamily, light } from '../../styles/theme';

/**
 * ダメな例。Web と同じ感覚でダークモード対応を書いたメール。
 * Apple Mail では一応それらしく見えるが、Gmail と Outlook デスクトップで崩れる。
 *
 * 仕込んである問題は 7 つ。README の対応表と合わせて読む。
 */

// 問題1: ダーク対応が @media だけ。Gmail は prefers-color-scheme 非対応、
//        Outlook デスクトップは @media 自体に非対応なので、このブロックは届かない。
// 問題2: 上書きを CSS 変数でやっている。Outlook.com は CSS 変数に非対応、
//        Gmail は var() 関数は読むが変数宣言を落とすので、定義しても値が入らない。
const style = `
  :root {
    --text-primary: ${light.textPrimary};
    --text-secondary: ${light.textSecondary};
    --bg-card: ${light.bgCard};
    --bg-page: ${light.bgPage};
    --border: ${light.border};
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --text-primary: ${colors.white};
      --text-secondary: ${colors.gray400};
      --bg-card: ${colors.black};
      --border: ${colors.whiteAlpha};
      --bg-page: ${colors.gray900};
    }
    .logo {
      fill: ${colors.white};
    }
  }
`;


// // 色は「背景と文字のペア」で定義する
// const card = { bg: '#FFFFFF', text: '#16181A' };

// const style = `
//   @media (prefers-color-scheme: dark) {
//     .card {
//       background-color: #16181A !important;
//       color: #FFFFFF !important;
//     }
//   }
// `;

{/* <Section
  className="card"
  style={{ backgroundColor: card.bg, color: card.text }}
></Section> */}




/** 「Sample」の文字をアウトライン化したパス（Arial Bold）。 */
const logoPath =
  'M3.2 -20.7 15.7 -21.9Q16.9 -15.6 20.3 -12.7Q23.8 -9.7 29.6 -9.7Q35.9 -9.7 39 -12.4Q42.2 -15 42.2 -18.5Q42.2 -20.8 40.8 -22.4Q39.5 -23.9 36.2 -25.1Q33.9 -25.9 25.9 -27.9Q15.6 -30.5 11.4 -34.2Q5.5 -39.5 5.5 -47Q5.5 -51.9 8.3 -56.1Q11 -60.4 16.2 -62.6Q21.4 -64.8 28.8 -64.8Q40.8 -64.8 46.8 -59.5Q52.9 -54.3 53.2 -45.5L40.3 -44.9Q39.5 -49.8 36.8 -52Q34.1 -54.1 28.6 -54.1Q23 -54.1 19.9 -51.8Q17.8 -50.4 17.8 -47.9Q17.8 -45.6 19.7 -44Q22.2 -42 31.5 -39.8Q40.9 -37.5 45.4 -35.2Q49.9 -32.8 52.5 -28.7Q55 -24.6 55 -18.6Q55 -13.1 52 -8.3Q48.9 -3.5 43.4 -1.2Q37.8 1.1 29.5 1.1Q17.4 1.1 11 -4.5Q4.5 -10 3.2 -20.7ZM74.9 -32.1 63.8 -34.1Q65.7 -40.8 70.2 -44Q74.8 -47.2 83.8 -47.2Q92 -47.2 96 -45.3Q100 -43.3 101.6 -40.3Q103.2 -37.4 103.2 -29.4L103.1 -15.2Q103.1 -9.1 103.7 -6.2Q104.3 -3.3 105.9 0H93.8Q93.3 -1.2 92.6 -3.6Q92.3 -4.7 92.2 -5Q89 -2 85.5 -0.5Q81.9 1 77.9 1Q70.7 1 66.6 -2.8Q62.5 -6.7 62.5 -12.6Q62.5 -16.5 64.4 -19.6Q66.3 -22.6 69.6 -24.3Q73 -25.9 79.4 -27.1Q87.9 -28.7 91.2 -30.1V-31.3Q91.2 -34.9 89.5 -36.4Q87.7 -37.9 82.9 -37.9Q79.7 -37.9 77.8 -36.6Q76 -35.3 74.9 -32.1ZM91.2 -22.2Q88.9 -21.4 83.8 -20.3Q78.7 -19.2 77.1 -18.2Q74.7 -16.5 74.7 -13.9Q74.7 -11.3 76.7 -9.4Q78.6 -7.6 81.5 -7.6Q84.8 -7.6 87.8 -9.7Q90 -11.4 90.7 -13.8Q91.2 -15.3 91.2 -19.7ZM114.3 -46.2H125.6V-39.9Q131.6 -47.2 140 -47.2Q144.4 -47.2 147.7 -45.4Q150.9 -43.5 153 -39.9Q156.1 -43.5 159.6 -45.4Q163.1 -47.2 167.1 -47.2Q172.2 -47.2 175.7 -45.1Q179.2 -43.1 181 -39.1Q182.2 -36.1 182.2 -29.5V0H170V-26.4Q170 -33.2 168.7 -35.2Q167 -37.9 163.5 -37.9Q161 -37.9 158.7 -36.3Q156.4 -34.7 155.4 -31.7Q154.4 -28.7 154.4 -22.2V0H142.2V-25.3Q142.2 -32 141.6 -34Q140.9 -35.9 139.6 -36.9Q138.2 -37.9 135.8 -37.9Q133 -37.9 130.8 -36.3Q128.5 -34.8 127.5 -31.9Q126.5 -29.1 126.5 -22.4V0H114.3ZM194 -46.2H205.4V-39.4Q207.6 -42.8 211.4 -45Q215.2 -47.2 219.8 -47.2Q227.8 -47.2 233.5 -40.9Q239.1 -34.6 239.1 -23.3Q239.1 -11.8 233.4 -5.4Q227.8 1 219.7 1Q215.9 1 212.8 -0.5Q209.7 -2 206.2 -5.7V17.6H194ZM206.1 -23.9Q206.1 -16.1 209.2 -12.4Q212.3 -8.6 216.7 -8.6Q221 -8.6 223.8 -12.1Q226.6 -15.5 226.6 -23.2Q226.6 -30.5 223.7 -34Q220.8 -37.5 216.5 -37.5Q212 -37.5 209.1 -34.1Q206.1 -30.6 206.1 -23.9ZM248.7 0V-63.7H261V0ZM300.2 -14.7 312.4 -12.6Q310 -6 305 -2.5Q299.9 1 292.3 1Q280.3 1 274.5 -6.8Q269.9 -13.1 269.9 -22.7Q269.9 -34.2 275.9 -40.7Q281.9 -47.2 291.1 -47.2Q301.4 -47.2 307.3 -40.4Q313.3 -33.6 313 -19.6H282.4Q282.6 -14.1 285.4 -11.1Q288.2 -8.1 292.4 -8.1Q295.3 -8.1 297.2 -9.6Q299.2 -11.2 300.2 -14.7ZM300.9 -27Q300.8 -32.3 298.2 -35.1Q295.6 -37.9 291.8 -37.9Q287.8 -37.9 285.2 -34.9Q282.6 -32 282.6 -27Z';

export const MailBad: FC = () => {
  return (
    <Html lang="ja">
      <Head>
        {/* 問題3: <meta name="color-scheme"> がない。自動変換の挙動を宣言できていない。 */}
        <meta content="width=device-width" name="viewport" />
        <meta content="light dark" name="color-scheme" />
        <style>{style}</style>
      </Head>
      {/* 問題4: ページ背景を <body> に静的値で書いただけ。ダークモード用の上書きが無いので、
                 カードだけが暗くなり、周りはライトのまま取り残される。
                 （背景自体は、macOS の Apple Mail でインライン SVG を表示させるために必要） */}
      <Body style={{ margin: 0, fontFamily, background: light.bgPage, backgroundColor: `var(--bg-page, ${light.bgPage})` }}>
        <Section style={{ padding: '40px 0', textAlign: 'center' }}>
          {/* 問題5: インライン SVG のロゴ。Apple Mail では @media で色が切り替わるが、
                     Gmail は <svg> を除去し、Outlook デスクトップも描画しないので、ロゴごと消える。 */}
          <svg
            aria-label="Sample"
            height={32}
            role="img"
            style={{ display: 'block', margin: '0 auto' }}
            viewBox="3.2 -64.8 309.8 82.4"
            width={120}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="logo" d={logoPath} fill={colors.navy900} />
          </svg>
        </Section>

        <Container style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <Section
            style={{
              // 問題6: 色指定が var() 単独。var() を解釈できないクライアントでは
              //        プロパティごと捨てられ、背景が消える。
              background: light.bgCard,
              backgroundColor: `var(--bg-card, ${light.bgCard})`,
              borderRadius: '16px',
              padding: '40px',
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'var(--text-primary)',
              }}
            >
              ログイン画面で、以下の認証コードを入力してください。
            </Text>

            <Text
              style={{
                margin: '24px 0 0',
                fontSize: '32px',
                fontWeight: 'bold',
                letterSpacing: '8px',
                lineHeight: 1.2,
                textAlign: 'center',
                color: 'var(--text-primary)',
              }}
            >
              123456
            </Text>

            <Text
              style={{
                margin: '24px 0 0',
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              このコードの有効期限は10分です。
            </Text>

            {/* 問題7: border を none で潰したあと、borderTop を var() 単独で指定している。
                       var() が捨てられると border: none だけが残り、罫線がまるごと消える。 */}
            <Hr
              style={{
                border: 'none',
                borderTop: '1px solid var(--border)',
                margin: '32px 0',
              }}
            />

            <Text
              style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              このメールに心当たりがない場合は、破棄してください。
            </Text>
          </Section>

          <Section style={{ padding: '32px 0', textAlign: 'center' }}>
            <Text
              style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}
            >
              Sample Inc.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MailBad;
