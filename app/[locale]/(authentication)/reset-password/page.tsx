import { Heading, ResetPasswordForm } from "@/components";
import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function ResetPassword() {
  const t = useTranslations("Index");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading type="heading">{t("confirmPasswordHeading")}</Heading>
        <Heading type="sub-heading">{t("resetText")}</Heading>
      </div>

      <ResetPasswordForm
        confirmNewPasswordPlaceholder={t("confirmPasswordHeading")}
        confirmPasswordError="Password does not match"
        backText={t("back")}
        newPasswordPlaceholder="Enter new password"
        passwordError={t("passwordError")}
        buttonText={t("reset")}
        defaultError={t("required")}
      />
    </div>
  );
}
