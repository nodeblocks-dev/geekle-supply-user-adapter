import { ONETIME_TOKEN_LIFETIME } from "../../constants";
import { getEnvBool, getEnvString, getExpiredDate } from "../../helpers";

export const sendResetPasswordEmailTemplate = {
  vendor: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <p>このメールはパスワードの再設定を依頼された方にお送りしています。</p>
      <p>以下のURLをクリックして、新しいパスワードを設定してください。</p>
      <p><a href="\${url}">[パスワード設定URL]</a></p>

      <p>パスワードの設定は、このメールの受信から24時間以内に実施してください。</p>
      
      <p>本メールは送信専用のアドレスです。</p>
      <p>このメールに心当たりがない場合は、お問い合わせください。</p>

      <p>-------------------</p>
      <p>Geekle 運営事務局</p>
      <p>141-0021 東京都品川区上大崎2-15-19</p>
      <p>お問い合わせ メールアドレス ： contact@geekle.com</p>
    `,
    subject: '[Geekle] 新しいパスワードを設定します',
    urlTemplate: `${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}/reset-password-submit/` + '${token}?email=${email}' + `&expiredAt=${getExpiredDate(ONETIME_TOKEN_LIFETIME)}`
  },
  enabled: getEnvBool('ADAPTER_EMAIL_RESET_PASSWORD_ENABLED')
};
