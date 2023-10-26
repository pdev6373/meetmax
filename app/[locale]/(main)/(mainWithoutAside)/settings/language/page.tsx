import {
  SettingsHeading,
  SettingsRouteText,
  Language as LanguageComponent,
} from "@/components";
import styles from "./page.module.css";
import { SettingsLanguageType } from "@/types";
import { useTranslations } from "next-intl";

export default function Language({ params: { locale } }: SettingsLanguageType) {
  const t = useTranslations("Index");

  return (
    <>
      <SettingsRouteText>{t("language")}</SettingsRouteText>
      <SettingsHeading>{t("language")}</SettingsHeading>
      <p className={styles.languageHeading}>{t("meetmaxLanguage")}</p>
      <div className={styles.languages}>
        <LanguageComponent locale={locale} short />
      </div>
    </>
  );
}
