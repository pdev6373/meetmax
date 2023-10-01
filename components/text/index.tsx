import { BodyTextType } from "@/types";
import styles from "./index.module.css";

export default function Text({ children, type, center }: BodyTextType) {
  return (
    type === "error" && (
      <p className={[styles.error, center && styles.center].join(" ")}>
        {children}
      </p>
    )
  );
}
