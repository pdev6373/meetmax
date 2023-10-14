"use client";
import { LayoutType } from "@/types";
import styles from "./layout.module.css";
import { Messages } from "@/components";
import { ONLINE_FRIENDS } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
