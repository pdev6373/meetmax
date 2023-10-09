"use client";
import { useState } from "react";
import { SettingsHeading, SettingsRouteText } from "@/components";
import Image from "next/image";
import styles from "./page.module.css";

export default function ViewingAndSharing() {
  const [options, setOptions] = useState<
    {
      title: string;
      options: { title: string; isSelected: boolean }[];
    }[]
  >([
    {
      title: "Who can see your post?",
      options: [
        {
          title: "Everyone",
          isSelected: true,
        },
        {
          title: "Followers",
          isSelected: false,
        },
        {
          title: "Only me",
          isSelected: false,
        },
      ],
    },
    {
      title: "Who can see your profile?",
      options: [
        {
          title: "Everyone",
          isSelected: true,
        },
        {
          title: "Followers",
          isSelected: false,
        },
        {
          title: "Only me",
          isSelected: false,
        },
      ],
    },
    {
      title: "Who can Follow you?",
      options: [
        {
          title: "Everyone",
          isSelected: true,
        },
        {
          title: "Off",
          isSelected: false,
        },
      ],
    },
  ]);
  return (
    <>
      <SettingsRouteText>Viewing and Sharing</SettingsRouteText>
      <SettingsHeading>Viewing and Sharing</SettingsHeading>
      <div className={styles.options}>
        {options.map((option) => (
          <div key={option.title} className={styles.option}>
            <p className={styles.title}>{option.title}</p>

            <div className={styles.radios}>
              {option.options.map((radioOption) => (
                <div
                  key={radioOption.title}
                  className={styles.radio}
                  onClick={() =>
                    setOptions((prev) =>
                      prev.map((prevOption) =>
                        prevOption.title !== option.title
                          ? prevOption
                          : {
                              title: prevOption.title,
                              options: prevOption.options.map((item) => ({
                                title: item.title,
                                isSelected:
                                  item.title === radioOption.title
                                    ? true
                                    : false,
                              })),
                            }
                      )
                    )
                  }
                >
                  <Image
                    src={
                      radioOption.isSelected
                        ? "/assets/select.svg"
                        : "/assets/deselect.svg"
                    }
                    alt="option icon"
                    width={16}
                    height={16}
                  />
                  <p className={styles.optionText}>{radioOption.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
