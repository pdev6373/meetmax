import { EditProfile } from "@/components";
import styles from "./page.module.css";

export default function Settings() {
  return (
    <div className={styles.wrapper}>
      <EditProfile />
    </div>
  );
}
