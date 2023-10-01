"use client";
import { SocialButtonType } from "@/types";
import { Button } from "..";
import styles from "./index.module.css";

export default function SocialLogins() {
  const socialButtons: SocialButtonType[] = [
    {
      text: "Log in with Google",
      icon: "/assets/google.svg",
      clickHandler: () => {},
    },
    {
      text: "Log in with Apple",
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
