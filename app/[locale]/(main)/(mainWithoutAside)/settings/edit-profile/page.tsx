import { EditProfile as EditProfileComponent } from "@/components";
import { useTranslations } from "next-intl";

export default function EditProfile() {
  const t = useTranslations("Index");

  return (
    <EditProfileComponent
      male={t("male")}
      female={t("female")}
      defaultError={t("required")}
      emailError={t("emailError")}
      namesError={t("namesError")}
      save={t("save")}
      cancel={t("cancel")}
    />
  );
}
