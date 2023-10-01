import { TextType } from "@/types";
import styles from "./index.module.css";

export default function Heading({ children, type, capitalize }: TextType) {
  return type == "heading" ? (
    <h2 className={[styles.heading, capitalize && styles.capitalize].join(" ")}>
      {children}
    </h2>
  ) : (
    <h3 className={styles.subHeading}>{children}</h3>
  );
}
