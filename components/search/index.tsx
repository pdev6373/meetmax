import { SearchType } from "@/types";
import Image from "next/image";
import styles from "./index.module.css";

export default function Search({ placeholder, value, onChange }: SearchType) {
  const setSearchValueHandler = (e: any) => onChange(e.target.value);

  return (
    <div className={styles.wrapper}>
      <Image src="/assets/search.svg" alt="search" width={16} height={16} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={setSearchValueHandler}
        className={styles.input}
      />
    </div>
  );
}
