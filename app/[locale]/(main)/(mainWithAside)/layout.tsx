import { LayoutType } from "@/types";
import { Aside } from "@/components";
import styles from "./layout.module.css";
import { useTranslations } from "next-intl";

export default function MainLayout({ children }: LayoutType) {
  const t = useTranslations("Index");

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>{children}</div>
      <div className={styles.aside}>
        <Aside
          friendsText={t("friends")}
          searchFriendsText={t("searchFriends")}
          error={t("anErrorOccurred")}
          connectWithOthers={t("connectWithOthers")}
          noFriends={t("noFriends")}
        />
      </div>
    </div>
  );
}
