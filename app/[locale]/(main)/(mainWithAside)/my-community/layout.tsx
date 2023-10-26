import { CommunityLayout as CommunityLayoutComponent } from "@/components";
import { MainLayoutType } from "@/types";
import { useTranslations } from "next-intl";

export default function CommunityLayout({
  children,
  params: { locale },
}: MainLayoutType) {
  const t = useTranslations("Index");

  return (
    <CommunityLayoutComponent
      children={children}
      locale={locale}
      recommendedText={t("recommended")}
      follower={t("follower")}
      followers={t("followers")}
      following={t("following")}
    />
  );
}
