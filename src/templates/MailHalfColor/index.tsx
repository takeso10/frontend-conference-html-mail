import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
} from '@react-email/components';
import { FC } from 'react';
import { colors, fontFamily, light } from '../../styles/theme';

/**
 * 背景色と文字色を、片方だけ指定したときに崩れる例。
 *
 * color-scheme で「ダーク対応済み」と宣言したが、色は片方ずつしか書いていない。
 * 宣言を受けて、クライアントは「指定されていない側」だけをダーク用の既定色にする。
 *
 *   - 文字色だけ指定: 背景は既定の暗い色になり、指定した暗い文字が沈む
 *   - 背景色だけ指定: 文字は既定の白になり、指定した明るい背景の上で消える
 *
 * Apple Mail で特に分かりやすい。自動反転するクライアントでは、
 * 反転の仕方によって崩れ方が変わる。
 */
export const MailHalfColor: FC = () => {
  return (
    <Html lang="ja">
      <Head>
        <meta content="width=device-width" name="viewport" />
        {/* 宣言だけして、ダーク用の CSS は書いていない。 */}
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
      </Head>
      {/* ページの背景色は指定していない。ダークモードでは既定の暗い背景になる。 */}
      <Body style={{ margin: 0, fontFamily }}>
        <Container
          style={{
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '40px 0',
          }}
        >
          {/* 文字色だけ指定。背景は既定の暗い色になり、暗い文字が見えなくなる。 */}
          <Text
            style={{
              margin: '0 0 24px',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: light.textPrimary,
            }}
          >
            Sample
          </Text>

          {/* 背景色だけ指定。中の文字は既定の白になり、白いカードの上で消える。 */}
          <Section
            style={{
              backgroundColor: light.bgCard,
              border: `1px solid ${light.border}`,
              borderRadius: '16px',
              padding: '40px',
            }}
          >
            <Text style={{ margin: 0, fontSize: '16px', lineHeight: 1.7 }}>
              ログイン画面で、以下の認証コードを入力してください。
            </Text>

            {/* 箱も背景色だけ指定。薄いグレーの上に白い文字になる。 */}
            <Section
              style={{
                backgroundColor: light.bgPage,
                borderRadius: '12px',
                margin: '24px 0',
                padding: '24px',
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontSize: '32px',
                  fontWeight: 'bold',
                  letterSpacing: '8px',
                  lineHeight: 1.2,
                  textAlign: 'center',
                }}
              >
                123456
              </Text>
            </Section>

            <Text style={{ margin: 0, fontSize: '14px', lineHeight: 1.7 }}>
              このコードの有効期限は10分です。心当たりがない場合は、このメールを破棄してください。
            </Text>
          </Section>

          {/* 文字色だけ指定。暗い背景の上に濃いグレーの文字で、ほとんど読めない。 */}
          <Text
            style={{
              margin: '32px 0 0',
              fontSize: '12px',
              textAlign: 'center',
              color: colors.gray700,
            }}
          >
            Sample Inc.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MailHalfColor;
