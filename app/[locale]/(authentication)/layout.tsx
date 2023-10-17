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
  const router = useRouter();
  const [showComponent, setShowComponent] = useState(false);
  const {
    accessToken: { accessToken },
  } = useContext(AuthContext);

  useEffect(() => {
    console.log(accessToken);

    if (accessToken) {
      router.replace("/");
      return;
    }

    setShowComponent(true);
  }, [accessToken]);

  if (!showComponent) return <></>;

  return (
    <div className={styles.wrapper}>
      <Header locale={locale} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
