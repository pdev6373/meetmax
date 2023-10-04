import { ReactorsType } from "@/types";
import Image from "next/image";
import styles from "./index.module.css";

export default function Reactors({ images, noOfReactions }: ReactorsType) {
  return (
    <div className={styles.reactors}>
      {images.slice(0, 3).map((image, index) => (
        <Image src={image} alt="image" width={18} height={18} key={index} />
      ))}

      {images.length > 3 && (
        <p className={styles.reactorsNumber}>{`+${noOfReactions}`}</p>
      )}
    </div>
  );
}
