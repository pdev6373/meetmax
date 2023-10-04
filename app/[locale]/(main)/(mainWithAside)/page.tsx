import { MakePost, Post } from "@/components";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <MakePost />
        <Post />
      </div>
      {/* <aside className={styles.aside}></aside> */}
    </div>
  );
}
