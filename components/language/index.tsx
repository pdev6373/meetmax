"use client";
import { useState, useEffect } from "react";
import { LanguageType, LocaleType } from "@/types";
import { usePathname } from "next/navigation";
import { LANGUAGES } from "@/constants";
import Image from "next/image";
import Link from "next-intl/link";
import styles from "./index.module.css";

export default function Language({ locale }: LocaleType) {
  const pathname = usePathname();
  const showLanguagesHandler = () => setShowLanguages((prev) => !prev);
  const languageChangeHandler = () =>
    LANGUAGES.find((language) => language.value == locale) || {
      value: "en-GB",
      text: "English (UK)",
    };

  const [showLanguages, setShowLanguages] = useState(false);
  const [language, setLanguage] = useState<LanguageType>(
    languageChangeHandler()
  );

  useEffect(() => {
    setLanguage(languageChangeHandler());
  }, [locale]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectedLanguage} onClick={showLanguagesHandler}>
        <p className={styles.selectedLanguageText}>{language.text}</p>
        <Image
          src="/assets/dropdown.svg"
          alt="dropdown"
          width={12}
          height={12}
          className={styles.dropdown}
        />
        <Image
          src="/assets/dropdown.svg"
          alt="dropdown"
          width={16}
          height={16}
          className={styles.dropdownWeb}
        />
      </div>

      {showLanguages && (
        <div className={styles.languagesWrapper}>
          <div className={styles.languages}>
            {LANGUAGES.map((avaliableLanguage) => (
              <Link
                onClick={() => setShowLanguages(false)}
                href={
                  pathname.split("/").length > 2
                    ? `/${pathname.slice(1).split("/").slice(1).join("/")}`
                    : `/${pathname.slice(1).split("/").join("/")}`
                }
                locale={avaliableLanguage.value}
                className={[
                  styles.language,
                  avaliableLanguage.text === language.text &&
                    styles.currentLanguage,
                ].join(" ")}
                key={avaliableLanguage.text}
              >
                <p>{avaliableLanguage.text}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
