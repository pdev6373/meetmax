import { Header } from "@/components";
import styles from "./layout.module.css";
import { RootLayoutType } from "@/types";
import { AuthProvider } from "@/context/authContext";

export default function AuthenticationLayout({
  children,
  params: { locale },
}: RootLayoutType) {
  return (
    <AuthProvider>
      <div className={styles.wrapper}>
        <Header locale={locale} />
        <main className={styles.main}>{children}</main>
      </div>
    </AuthProvider>
  );
}
