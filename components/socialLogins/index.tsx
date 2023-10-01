"use client";
import { SocialButtonType, SocialLoginType } from "@/types";
import { Button } from "..";
import styles from "./index.module.css";

export default function SocialLogins({
  googleText,
  appleText,
}: SocialLoginType) {
  const socialButtons: SocialButtonType[] = [
    {
      // text: "Log in with Google",
      text: googleText,
      icon: "/assets/google.svg",
      clickHandler: () => {},
    },
    {
      // text: "Log in with Apple",
      text: appleText,
      icon: "/assets/apple.svg",
      clickHandler: () => {},
    },
  ];

  return (
    <div className={styles.socialButtons}>
      {socialButtons.map((button) => (
        <Button
          type="social"
          icon={button.icon}
          onClick={button.clickHandler}
          key={button.text}
        >
          {button.text}
        </Button>
      ))}
    </div>
  );
}
