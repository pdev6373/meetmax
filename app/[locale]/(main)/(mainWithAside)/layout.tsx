import { LayoutType } from "@/types";
import { Aside } from "@/components";
import styles from "./layout.module.css";

export default function MainLayout({ children }: LayoutType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>{children}</div>
      <div className={styles.aside}>
        <Aside />
      </div>
    </div>
  );
}
