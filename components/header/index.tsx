import { LocaleType } from "@/types";
import { Logo, Language } from "..";
import styles from "./index.module.css";

export default function Header({ locale }: LocaleType) {
  return (
    <header className={styles.header}>
      <Logo />
      <Language locale={locale} />
    </header>
  );
}
