import { useTranslations } from "next-intl";
import { CheckMail as CheckMailComponent } from "@/components";

export default function CheckMail() {
  const t = useTranslations("Index");

  return (
    <CheckMailComponent
      checkMailText={t("checkMail")}
      sendMailText={t("sentMail")}
      skipNowText={t("skipNow")}
      noEmailText={t("didntReceiveEmail")}
      resendText={t("resend")}
    />
  );
}
