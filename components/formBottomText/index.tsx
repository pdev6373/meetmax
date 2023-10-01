import { FormButtonTextType } from "@/types";
import styles from "./index.module.css";
import Link from "next/link";

export default function FormBottomText({
  text,
  actionText,
  onActionTextClick,
  actionType,
}: FormButtonTextType) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.wrapperText}>{text}</p>
      {actionType === "link" ? (
        <Link className={styles.wrapperActionText} href={onActionTextClick()}>
          {actionText}
        </Link>
      ) : (
        <p className={styles.wrapperActionText} onClick={onActionTextClick}>
          {actionText}
        </p>
      )}
    </div>
  );
}
