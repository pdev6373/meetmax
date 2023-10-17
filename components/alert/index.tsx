import { AlertType } from "@/types";
import Image from "next/image";
import styles from "./index.module.css";

export default function Alert({
  children,
  open = "wait",
  setOpen,
  isDanger = true,
}: AlertType) {
  return (
    <div
      className={[
        styles.wrapper,
        open === "yes"
          ? styles.wrapperShow
          : open === "no" && styles.wrapperHide,
        isDanger && styles.borderDanger,
      ].join(" ")}
    >
      <div className={styles.main}>
        <Image
          src={isDanger ? "/assets/error.svg" : "/assets/check.svg"}
          alt="alert"
          width={16}
          height={16}
          className={styles.errorTypeIcon}
        />
        <p
          className={[styles.message, isDanger && styles.dangerMessage].join(
            " "
          )}
        >
          {children}
        </p>
      </div>

      <div className={styles.close} onClick={() => setOpen("no")}>
        <Image src="/assets/close.svg" alt="close" width={16} height={16} />
      </div>
    </div>
  );
}
