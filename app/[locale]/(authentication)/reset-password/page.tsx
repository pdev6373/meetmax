import { Heading, ResetPasswordForm } from "@/components";
import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function ResetPassword() {
  const t = useTranslations("Index");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading type="heading">{t("resetPasswordHeading")}</Heading>
        <Heading type="sub-heading">{t("resetPasswordSubHeading")}</Heading>
      </div>

      <ResetPasswordForm
        newPasswordPlaceholder={t("newPasswordPlaceholder")}
        confirmNewPasswordPlaceholder={t("confirmPassword")}
        buttonText={t("reset")}
        backText={t("back")}
        confirmPasswordError={t("confirmPasswordError")}
        passwordError={t("passwordError")}
        defaultError={t("required")}
      />
    </div>
  );
}
