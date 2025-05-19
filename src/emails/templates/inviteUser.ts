import { ONETIME_TOKEN_LIFETIME } from "../../constants";
import { getEnvBool, getEnvString, getExpiredDate } from "../../helpers";

export const inviteUserTemplate = {
  vendor: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <p>以下のリンクからアカウント作成を行ってください</p>
      
      <p>[<a href="\${url}">アカウント作成URL</a>]</p>

      <p>本メールは送信専用のアドレスです。</p>
      <p>このメールに心当たりがない場合は、お問い合わせください。</p>
      
      <p>-------------------</p>
      <p>Geekle 運営事務局</p>
      <p>141-0021 東京都品川区上大崎2-15-19</p>
      <p>お問い合わせ メールアドレス ： contact@geekle.com</p>
    `,
    subject: '[Geekle] アカウントの登録を行います',
    urlTemplate: `${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL', '')}` + '/auth/accept-invitation/${invitationId}/${token}?email=${email}' + `&expiredAt=${getExpiredDate(ONETIME_TOKEN_LIFETIME)}`
  },
  enabled: getEnvBool('ADAPTER_EMAIL_INVITE_USER_ENABLED')
};
