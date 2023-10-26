import { ViewingAndSharing as ViewingAndSharingComponent } from "@/components";
import { useTranslations } from "next-intl";

export default function ViewingAndSharing() {
  const t = useTranslations("Index");

  return (
    <ViewingAndSharingComponent
      viewingAndSharing={t("viewingAndSharingFull")}
      everyone={t("everyone")}
      off={t("off")}
      onlyMe={t("onlyMe")}
      followers={t("followers")}
      whoCanFollow={t("whoCanFollow")}
      postVisibilityText={t("postVisibility")}
      profileVisibilityText={t("profileVisibility")}
    />
  );
}
