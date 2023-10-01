import { Header } from "@/components";
import styles from "./layout.module.css";
import { RootLayoutType } from "@/types";

export default function AuthenticationLayout({
  children,
  params: { locale },
}: RootLayoutType) {
  return (
    <div className={styles.wrapper}>
      <Header locale={locale} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
