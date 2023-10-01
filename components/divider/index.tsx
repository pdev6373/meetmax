import styles from "./index.module.css";
import { useTranslations } from "next-intl";

export default function Divider() {
  const t = useTranslations("Index");

  return (
    <div className={styles.divider}>
      <p className={styles.dividerText}>{t("or")}</p>
    </div>
  );
}
