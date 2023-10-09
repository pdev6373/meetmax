import Link from "next/link";
import { SettingsTextType } from "@/types";
import styles from "./index.module.css";

export default function SettingsRouteText({ children }: SettingsTextType) {
  return (
    <Link href="/settings" className={styles.route}>
      <span className={styles.routeDim}>Settings</span>
      {`/${children}`}
    </Link>
  );
}
