import { Birthdays, MakePost, Post, RecentEvent } from "@/components";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <MakePost />
        <Post />
        <RecentEvent />
        <Birthdays />
      </div>
      {/* <aside className={styles.aside}></aside> */}
    </div>
  );
}
