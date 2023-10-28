import { EditProfile } from "@/components";
import { useTranslations } from "next-intl";

export default function Settings() {
  const t = useTranslations("Index");

  return (
    <EditProfile
      editProfile={t("editProfile")}
      fullName={t("fullName")}
      birthday={t("birthday")}
      bio={t("bio")}
      enterYourBio={t("enterYourBio")}
      enterYourLocation={t("enterYourLocation")}
      locationText={t("location")}
      defaultError={t("required")}
      websiteText={t("website")}
      enterYourWebsite={t("enterYourWebsite")}
      enterYourPhoneNumber={t("enterYourPhoneNumber")}
      phoneNumberError={t("phoneNumberError")}
      websiteError={t("websiteError")}
      phoneNumberText={t("phoneNumber")}
      yourUsername={t("yourUsername")}
      socialLink={t("socialLink")}
      linkError={t("linkError")}
      namesError={t("namesError")}
      successText={t("profileUpdateSuccess")}
      anErrorOccurred={t("anErrorOccurred")}
      genderText={t("gender")}
      facebookText={t("facebook")}
      linkedinText={t("linkedin")}
      instagramText={t("instagram")}
      twitterText={t("twitter")}
      male={t("male")}
      female={t("female")}
      save={t("save")}
      cancel={t("cancel")}
    />
  );
}
