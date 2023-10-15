import { ButtonType } from "@/types";
import Image from "next/image";
import styles from "./index.module.css";

export default function Button({
  children,
  icon,
  onClick,
  type,
  isLoading = false,
}: ButtonType) {
  return type === "social" ? (
    <button
      type="button"
      onClick={onClick && onClick}
      className={styles.socialButton}
    >
      {icon && <Image src={icon} alt="social icon" width={16} height={16} />}
      <p className={styles.socialButtonText}>
        {isLoading ? (
          <Image
            src="/assets/spinner.svg"
            alt="calendar"
            width={24}
            height={24}
          />
        ) : (
          children
        )}
      </p>
    </button>
  ) : (
    <button
      type="submit"
      onClick={
        onClick &&
        ((e) => {
          e.preventDefault();
          onClick();
        })
      }
      className={styles.submitButton}
    >
      <p className={styles.submitButtonText}>
        {isLoading ? (
          <Image
            src="/assets/spinner.svg"
            alt="calendar"
            width={24}
            height={24}
          />
        ) : (
          children
        )}
      </p>
    </button>
  );
}
