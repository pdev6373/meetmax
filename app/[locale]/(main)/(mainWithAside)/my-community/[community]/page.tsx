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
      connectWithOthers={t("connectWithOthers")}
      facebookLink={t("facebookLink")}
      instagramLink={t("instagramLink")}
      linkedinLink={t("linkedinLink")}
      twitterLink={t("twitterLink")}
      websiteLink={t("websiteLink")}
      locale={locale}
    />
  );
}
