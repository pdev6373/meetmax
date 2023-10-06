import styles from "./index.module.css";
import Image from "next/image";

export default function CreatePost() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}></div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h3 className={styles.headingText}>Create a post</h3>

          <div className={styles.headerMain}>
            <p className={styles.visibleText}>Visible for</p>

            <div className={styles.currenShowOption}>
              <p className={styles.currenShowOptionValue}>Friends</p>
              <Image
                src="/assets/dropdown.svg"
                alt="drop down"
                width={10}
                height={10}
              />
            </div>

            <div className={styles.closeIcon}>
              <Image
                src="/assets/close.svg"
                alt="close"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>

        <div>
          <div className={styles.mainContent}>
            <Image src="/assets/user.png" alt="user" width={32} height={32} />
            <div
              contentEditable
              className={styles.mainInput}
              placeholder="What’s happening?"
            ></div>
          </div>

          <div></div>
        </div>

        <button className={styles.post}>Post</button>
      </div>
    </div>
  );
}
