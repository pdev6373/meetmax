import Image from "next/image";
import styles from "./index.module.css";

export default function Post() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.mainHeader}>
          <div className={styles.mainHeaderDetails}>
            <Image src="/assets/user.png" alt="user" width={32} height={32} />
            <div>
              <h3 className={styles.name}>Sepural Gallery</h3>
              <p className={styles.time}>15h. Public</p>
            </div>
          </div>

          <div>
            <Image src="/assets/more.svg" alt="more" width={16} height={16} />
          </div>
        </div>

        <div>
          <Image
            src="/assets/post-image.png"
            alt="post image"
            width={335}
            height={185}
          />
        </div>

        <div className={styles.mainBottom}>
          <div className={styles.reactors}>
            <Image src="/assets/user.png" alt="user" width={18} height={18} />
            <Image src="/assets/user.png" alt="user" width={18} height={18} />
            <Image src="/assets/user.png" alt="user" width={18} height={18} />
            <p className={styles.reactorsNumber}>+9</p>
          </div>

          <div className={styles.bottomTexts}>
            <p className={styles.bottomText}>3 Comments</p>
            <p className={styles.bottomText}>17 Share</p>
          </div>
        </div>
      </div>

      <div></div>
      <div></div>
    </div>
  );
}
