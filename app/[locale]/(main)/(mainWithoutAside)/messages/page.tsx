import Image from "next/image";
import styles from "./page.module.css";

export default function Message() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/assets/start-chat.svg"
        // src="/assets/ssss.png"
        alt="start chat"
        width={300}
        height={300}
      />
    </div>
  );
}
