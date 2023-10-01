import Image from "next/image";
import styles from "./index.module.css";

export default function index() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/assets/logo.svg"
        alt="logo"
        width={16}
        height={16}
        className={styles.logo}
      />
      <Image
        src="/assets/logo.svg"
        alt="logo"
        width={26}
        height={26}
        className={styles.logoWeb}
      />
      <p className={styles.logoText}>Meetmax</p>
    </div>
  );
}
