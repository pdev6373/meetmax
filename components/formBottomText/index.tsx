import { FormButtonTextType } from "@/types";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";

export default function FormBottomText({
  text,
  actionText,
  onActionTextClick,
  actionType,
  mainform,
  loading = false,
}: FormButtonTextType) {
  return (
    <div className={[styles.wrapper, mainform && styles.mainform].join(" ")}>
      <p className={styles.wrapperText}>{text}</p>
      {actionType === "link" ? (
        <Link className={styles.wrapperActionText} href={onActionTextClick()}>
          {actionText}
        </Link>
      ) : (
        <p className={styles.wrapperActionText} onClick={onActionTextClick}>
          {loading ? (
            <Image
              src="/assets/spinner.svg"
              alt="loading"
              width={20}
              height={20}
            />
          ) : (
            actionText
          )}
        </p>
      )}
    </div>
  );
}
