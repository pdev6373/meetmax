import { SwtichType } from "@/types";
import styles from "./index.module.css";

export default function Switch({ state, onClick }: SwtichType) {
  return (
    <div
      onClick={onClick}
      className={[styles.wrapper, state === "on" && styles.wrapperOn].join(" ")}
    ></div>
  );
}
