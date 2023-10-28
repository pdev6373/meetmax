import { CommunityLayout as CommunityLayoutComponent } from "@/components";
import { MainLayoutType } from "@/types";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meetmax - Community",
  description:
    "Discover our online community hub. Engage, connect, and discuss.",
};

export default function CommunityLayout({
  children,
  params: { locale },
}: MainLayoutType) {
  const t = useTranslations("Index");

  return (
    <CommunityLayoutComponent
      locale={locale}
      recommendedText={t("recommended")}
      follower={t("follower")}
      followers={t("followers")}
      following={t("following")}
    >
      {children}
    </CommunityLayoutComponent>
  );
}
