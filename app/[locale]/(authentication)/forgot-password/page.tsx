import { ForgotPasswordForm, Heading } from "@/components";
import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function ForgotPassword() {
  const t = useTranslations("Index");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading type="heading">{t("forgotPassword")}</Heading>
        <Heading type="sub-heading">{t("resetText")}</Heading>
      </div>

      <ForgotPasswordForm
        emailPlaceholder={t("email")}
        buttonText={t("send")}
        backText={t("back")}
        defaultError={t("required")}
        emailError={t("emailError")}
      />
    </div>
  );
}
