import { SettingsTextType } from "@/types";
import styles from "./index.module.css";

export default function SettingsHeading({ children }: SettingsTextType) {
  return <h2 className={styles.heading}>{children}</h2>;
}
