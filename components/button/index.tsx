import { ButtonType } from "@/types";
import Image from "next/image";
import styles from "./index.module.css";

export default function Button({
  children,
  icon,
  onClick,
  type,
  isLoading = false,
  variation = "normal",
  disabled,
}: ButtonType) {
  return type === "social" ? (
    <button
      disabled={disabled || isLoading}
      type="button"
      onClick={!disabled && onClick && onClick}
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
      disabled={isLoading || isLoading}
      type="submit"
      onClick={
        onClick &&
        ((e) => {
          e.preventDefault();
          onClick();
        })
      }
      className={
        variation === "normal" ? styles.submitButton : styles.submitButtonSmall
      }
    >
      <p
        className={
          variation === "normal"
            ? styles.submitButtonText
            : styles.submitButtonSmallText
        }
      >
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
