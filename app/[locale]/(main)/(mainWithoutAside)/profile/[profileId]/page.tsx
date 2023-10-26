import { Profile as ProfileComponent } from "@/components";
import { useTranslations } from "next-intl";
export default function Profile(param: any) {
  const t = useTranslations("Index");

  return (
    <ProfileComponent
      id={param.params.profileId}
      born={t("born")}
      chooseAnImage={t("chooseAnImage")}
      editBasicInfo={t("editBasicInfo")}
      editCoverPhoto={t("editCoverPhoto")}
      editDetails={t("editDetails")}
      editPhoto={t("editPhoto")}
      female={t("female")}
      male={t("male")}
      facebook={t("facebook")}
      instagram={t("instagram")}
      linkedin={t("linkedin")}
      twitter={t("twitter")}
      follow={t("follow")}
      follower={t("follower")}
      followers={t("followers")}
      following={t("following")}
      intro={t("intro")}
      save={t("save")}
      unfollow={t("unfollow")}
      noPostYet={t("noPostYet")}
    />
  );
}
