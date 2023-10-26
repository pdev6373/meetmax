import { MainLayout as MainLayoutComponent } from "@/components";
import { MainLayoutType } from "@/types";
import { useTranslations } from "next-intl";

export default function MainLayout({
  children,
  params: { locale },
}: MainLayoutType) {
  const t = useTranslations("Index");

  return (
    <MainLayoutComponent
      children={children}
      locale={locale}
      sidenavTexts={{
        feedText: t("feed"),
        communityText: t("myCommunity"),
        notificationText: t("notification"),
        profileText: t("profile"),
        settingsText: t("settings"),
        logoutText: t("logout"),
        cancelText: t("cancel"),
        logoutConfirmationText: t("confirmLogout"),
      }}
    />
  );
}
