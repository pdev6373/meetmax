import { InputType } from "@/types";
import Image from "next/image";
import styles from "./index.module.css";

export default function Input({
  icon,
  value,
  onChange,
  placeholder,
  actionIcon,
  onActionIconClick,
  type,
  isDisabled = false,
  errorComponent,
}: InputType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <Image src={icon} alt="input icon" width={16} height={16} />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={[
            styles.input,
            type === "password" && styles.noSelect,
          ].join(" ")}
          disabled={isDisabled}
        />
        {actionIcon?.length && (
          <div className={styles.action} onClick={onActionIconClick}>
            <Image src={actionIcon} alt="input icon" width={16} height={16} />
          </div>
        )}
      </div>

      {errorComponent && (
        <div className={styles.errorWrapper}>{errorComponent}</div>
      )}
    </div>
  );
}
