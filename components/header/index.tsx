import Link from "next/link";
import { LocaleType } from "@/types";
import { Logo, Language } from "..";
import styles from "./index.module.css";

export default function Header({ locale }: LocaleType) {
  return (
    <header className={styles.header}>
      <Link href="/login">
        <Logo />
      </Link>
      <Language locale={locale} />
    </header>
  );
}
