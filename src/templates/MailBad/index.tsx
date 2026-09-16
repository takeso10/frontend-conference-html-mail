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
import { colors, fontFamily, light, logos } from '../../styles/theme';

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
    --border: ${light.border};
    --link: ${light.link};
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --text-primary: ${colors.white};
      --text-secondary: ${colors.gray400};
      --bg-card: ${colors.black};
      --border: ${colors.whiteAlpha};
      --link: ${colors.blue400};
    }
  }
`;

export const MailBad: FC = () => {
  return (
    <Html lang="ja">
      <Head>
        {/* 問題3: <meta name="color-scheme"> がない。自動変換の挙動を宣言できていない。 */}
        <meta content="width=device-width" name="viewport" />
        <style>{style}</style>
      </Head>
      {/* 問題4: body に背景色を指定していない。クライアントの自動変換任せになる。 */}
      <Body style={{ margin: 0, fontFamily }}>
        <Section style={{ padding: '40px 0', textAlign: 'center' }}>
          {/* 問題5: 透過PNGのロゴ。背景だけが反転するとロゴが沈んで読めなくなる。 */}
          <Img alt="Lumina" height={40} src={logos.transparent} />
        </Section>

        <Container style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <Section
            style={{
              // 問題6: 色指定が var() 単独。var() を解釈できないクライアントでは
              //        プロパティごと捨てられ、背景が消える。
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              padding: '40px',
            }}
          >
            <Heading
              style={{
                margin: 0,
                fontSize: '24px',
                lineHeight: 1.4,
                color: 'var(--text-primary)',
              }}
            >
              ご登録ありがとうございます
            </Heading>

            <Text
              style={{
                margin: '24px 0 0',
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'var(--text-primary)',
              }}
            >
              Lumina のアカウント登録が完了しました。
              <br />
              下のリンクから最初の設定を進めてください。
            </Text>

            <Text style={{ margin: '16px 0 0', fontSize: '16px', lineHeight: 1.7 }}>
              <Link href="https://example.com/setup" style={{ color: 'var(--link)' }}>
                初期設定をはじめる
              </Link>
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
              このメールに心当たりがない場合は破棄してください。
            </Text>
          </Section>

          <Section style={{ padding: '32px 0', textAlign: 'center' }}>
            <Text
              style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}
            >
              Lumina Inc.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MailBad;
