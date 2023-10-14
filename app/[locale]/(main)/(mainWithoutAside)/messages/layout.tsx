"use client";
import { LayoutType } from "@/types";
import { Messages } from "@/components";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

export default function MessagesLayout({ children }: LayoutType) {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <div
        className={[
          styles.messages,
          pathname !== "/messages" && styles.messagesHidden,
        ].join(" ")}
      >
        <Messages />
      </div>

      <div
        className={[
          styles.message,
          pathname === "/messages" && styles.messageNoDisplay,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
