import {
  SettingsHeading,
  SettingsRouteText,
  Language as LanguageComponent,
} from "@/components";
import styles from "./page.module.css";
import { SettingsLanguageType } from "@/types";

export default function Language({ params: { locale } }: SettingsLanguageType) {
  return (
    <>
      <SettingsRouteText>Language</SettingsRouteText>
      <SettingsHeading>Language</SettingsHeading>
      <p className={styles.languageHeading}>Show Meetmax in this language.</p>
      <div className={styles.languages}>
        <LanguageComponent locale={locale} short />
      </div>
    </>
  );
}
