// スライドのスクショ用。src/templates/MailBad を 1 画面に収まるよう整形したもの。
// 色は theme.ts を参照せず直接書き、SVG のパスは省略している。
import { Body, Container, Head, Hr, Html, Section, Text } from '@react-email/components';

const style = `
  :root {
    --text-primary: #16181A;
    --text-secondary: #5A5F65;
    --bg-card: #FFFFFF;
    --border: #DDE2E7;
  }
  /* 問題1: ダーク対応が @media だけ */
  @media (prefers-color-scheme: dark) {
    /* 問題2: CSS 変数で上書きしている */
    :root {
      --text-primary: #FFFFFF;
      --text-secondary: #A6ADB5;
      --bg-card: #16181A;
      --border: #FFFFFF99;
    }
    .logo { fill: #FFFFFF; }
  }
`;

export const MailBad = () => (
  <Html lang="ja">
    <Head>
      {/* 問題3: <meta name="color-scheme"> がない */}
      <style>{style}</style>
    </Head>

    {/* 問題4: 背景色をどこにも指定していない */}
    <Body style={{ margin: 0 }}>
      {/* 問題5: ロゴがインライン SVG */}
      <svg width={120} height={32} viewBox="0 0 310 82">
        <path className="logo" fill="#1B2A4A" d="..." />
      </svg>

      <Container style={{ maxWidth: '600px' }}>
        {/* 問題6: 色指定が var() 単独 */}
        <Section style={{ backgroundColor: 'var(--bg-card)', padding: '40px' }}>
          <Text style={{ color: 'var(--text-primary)' }}>
            ログイン画面で、以下の認証コードを入力してください。
          </Text>
          <Text style={{ color: 'var(--text-primary)', fontSize: '32px' }}>
            123456
          </Text>

          {/* 問題7: border: none のあと、borderTop を var() 単独で指定 */}
          <Hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

          <Text style={{ color: 'var(--text-secondary)' }}>
            このメールに心当たりがない場合は、破棄してください。
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
