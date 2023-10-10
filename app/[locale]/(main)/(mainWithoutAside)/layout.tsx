import { LayoutType } from "@/types";
import styles from "./layout.module.css";

export default function MainLayout({ children }: LayoutType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.main}>
          <div className={styles.mainInner}>{children}</div>
        </div>
      </div>
    </div>
  );
}
