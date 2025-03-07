import { getEnvBool, getEnvString } from "../../helpers";

export const inviteUserTemplate = {
  vendor: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <p>以下のリンクからアカウント作成を行ってください</p>
      <p>[<a href="\${url}">アカウント作成URL</a>]</p>
      <p>本メールは送信専用のアドレスです。</p>
      <p>このメールに心当たりがない場合は、お問い合わせください。</p>
      <br />
      <p>Geekle</p>
      <a href="${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL', '')}">${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL', '')}</a>
      <br />
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: '[Geekle] アカウントの登録を行います',
    urlTemplate: `${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL', '')}` + '/auth/accept-invitation/${invitationId}/${token}?email=${email}'
  },
  enabled: getEnvBool('ADAPTER_EMAIL_INVITE_USER_ENABLED')
};
