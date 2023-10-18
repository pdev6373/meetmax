import { EditProfile } from "@/components";
import { useTranslations } from "next-intl";

export default function Settings() {
  const t = useTranslations("Index");

  return (
    <EditProfile
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
