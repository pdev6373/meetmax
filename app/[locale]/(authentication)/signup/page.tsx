import { Divider, Heading, SignupForm, SocialLogins } from "@/components";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";

export default function Signup() {
  const t = useTranslations("Index");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading type="heading" capitalize>
          {t("signupHeading")}
        </Heading>
        <Heading type="sub-heading">{t("signupSubHeading")}</Heading>
      </div>

      <div className={styles.formWrapper}>
        {/* <SocialLogins
          googleText={t("googleLogin")}
          appleText={t("appleLogin")}
        />
        <Divider /> */}

        <SignupForm
          emailPlaceholder={t("email")}
          namePlaceholder={t("name")}
          passwordPlaceholder={t("signupPassword")}
          dateOfBirthPlaceholder={t("dob")}
          male={t("male")}
          female={t("female")}
          hasAccountText={t("hasAccount")}
          signinText={t("signIn")}
          signupText={t("signUp")}
          defaultError={t("required")}
          emailError={t("emailError")}
          namesError={t("namesError")}
          passwordError={t("passwordError")}
          save={t("save")}
          cancel={t("cancel")}
        />
      </div>
    </div>
  );
}
