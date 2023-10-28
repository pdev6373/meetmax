"use client";
import { useState, useEffect, useContext } from "react";
import { Header } from "@/components";
import { RootLayoutType } from "@/types";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import styles from "./layout.module.css";

export default function AuthenticationLayout({
  children,
  params: { locale },
}: RootLayoutType) {
  const { replace } = useRouter();
  const [showComponent, setShowComponent] = useState(false);
  const {
    accessToken: { accessToken },
  } = useContext(AuthContext);

  useEffect(() => {
    if (accessToken) {
      replace("/");
      return;
    }

    setShowComponent(true);
  }, [accessToken, replace]);

  if (!showComponent) return <></>;

  return (
    <div className={styles.wrapper}>
      <Header locale={locale} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
