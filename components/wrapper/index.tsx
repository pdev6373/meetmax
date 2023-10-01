import { LayoutType } from "@/types";
import styles from "./index.module.css";

export default function Wrapper({ children }: LayoutType) {
  return <div className={styles.wrapper}>{children}</div>;
}
