import { getEnvString } from "../../helpers";

export const newUserTemplate = {
    vendor: {
        bodyTemplate: `
            <p>Geekleをご利用いただきありがとうございます。</p>
            <p>Geekleの管理者登録手続きが完了しました。</p>

            <p>登録メールアドレス: {{email}}</p>
            <p>管理者向けサイト: <a href="${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}">[サプライサイトホームURL]</a></p>

            <p>本メールは送信専用のアドレスです。</p>
            <p>このメールに心当たりがない場合は、お問い合わせください。</p>

            
            <p>-------------------</p>
            <p>Geekle 運営事務局</p>
            <p>141-0021 東京都品川区上大崎2-15-19</p>
            <p>お問い合わせ メールアドレス ： contact@geekle.com</p>
            `,
        subject: '[Geekle] アカウントの登録が完了しました',
        urlTemplate: ''
    },
};

