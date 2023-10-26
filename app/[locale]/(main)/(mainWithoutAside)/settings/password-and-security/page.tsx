import { PasswordAndSecurity as PasswordAndSecurityComponent } from "@/components";
import { useTranslations } from "next-intl";

export default function PasswordAndSecurity() {
  const t = useTranslations("Index");

  return (
    <PasswordAndSecurityComponent
      changePasswordText={t("changePassword")}
      forgotPasswordText={t("forgotPassword")}
      save={t("save")}
      retypePasswordText={t("retypePassword")}
      errorText={t("invalidOldPassword")}
      defaultError={t("required")}
      newPasswordText={t("newPassword")}
      confirmPasswordError={t("confirmPasswordError")}
      invalidOldPassword={t("invalidOldPassword")}
      passwordError={t("passwordError")}
      currentPasswordText={t("currentPassword")}
      successText={t("passwordChangedSuccess")}
    />
  );
}
