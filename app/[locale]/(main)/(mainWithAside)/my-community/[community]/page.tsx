import { Community as CommunityComponent } from "@/components";
import { useTranslations } from "next-intl";

export default function Community({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("Index");
  return (
    <CommunityComponent
      unfollow={t("unfollow")}
      follow={t("follow")}
      noFollower={t("noFollower")}
      noFollowing={t("noFollowing")}
      locale={locale}
    />
  );
}
