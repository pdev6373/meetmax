"use client";
import { LayoutType } from "@/types";
import styles from "./layout.module.css";
import { usePathname } from "next/navigation";

export default function MainLayout({ children, params }: LayoutType) {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div
          className={[
            styles.main,
            pathname.startsWith(`/${params?.locale}/profile`) &&
              styles.mainNoPadding,
          ].join(" ")}
        >
          <div className={styles.mainInner}>{children}</div>
        </div>
      </div>
    </div>
  );
}
