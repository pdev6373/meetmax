import Image from "next/image";
import styles from "./index.module.css";

export default function Birthdays() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.headerName}>Birthdays</h3>
        <p className={styles.seeAll}>See All</p>
      </div>

      <div className={styles.birthdays}>
        <div className={styles.birthday}>
          <div className={styles.birthdayMain}>
            <Image
              src="/assets/profile-photo.png"
              alt="birthday image"
              width={45}
              height={45}
              className={styles.birthdayUser}
            />

            <div className={styles.birthdayContent}>
              <h3 className={styles.birthdayheading}>Edilson De Carvalho</h3>
              <p className={styles.birthdayBody}>Birthday today</p>
            </div>
          </div>

          <div className={styles.birthdayInputWrapper}>
            <input
              type="text"
              placeholder="Write on his inbox"
              className={styles.birthdayInput}
            />

            <div className={styles.send}>
              <Image
                src="/assets/send.svg"
                alt="reaction"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>

        <div className={styles.upcoming}>
          <Image
            src="/assets/event.png"
            alt="birthday image"
            width={45}
            height={45}
          />

          <div className={styles.upcomingMain}>
            <h3 className={styles.upcomingHeader}>Upcoming birthdays</h3>
            <p className={styles.upcomingBody}>
              See 12 others have upcoming birthdays
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
