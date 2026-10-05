// スライドのスクショ用。src/templates/MailGood のカード背景だけを抜き出したもの。
import { Section } from '@react-email/components';

export const Card = () => (
  <Section
    className="bg-card"
    style={{
      // 先に静的値：var() を読めないクライアントではこれが残る
      background: '#FFFFFF',
      // 後から上書き：var() を読めるクライアントではこちらが効く
      backgroundColor: 'var(--bg-card, #FFFFFF)',
    }}
  />
);
