import { SettingsLayout as SettingsLayoutComponent } from "@/components";
import { MainLayoutType } from "@/types";
import { useTranslations } from "next-intl";

export default function SettingsLayout({
  children,
  params: { locale },
}: MainLayoutType) {
  const t = useTranslations("Index");

  return (
    <SettingsLayoutComponent
      children={children}
      locale={locale}
      texts={{
        editProfile: t("editProfile"),
        language: t("language"),
        passwordAndSecurity: t("passwordAndSecurity"),
        viewingAndSharing: t("viewingAndSharing"),
        logoutText: t("logout"),
        cancelText: t("cancel"),
        logoutConfirmationText: t("confirmLogout"),
      }}
    />
  );
}
