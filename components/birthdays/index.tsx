import Image from "next/image";
import styles from "./index.module.css";

export default function Birthdays() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.headerName}>Recent Event</h3>
        <p className={styles.seeAll}>See All</p>
      </div>

      <div className={styles.birthdays}>
        <div>
          <div></div>
          <div></div>
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
