"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

const headerActions = [
  {
    icon: "/assets/call.svg",
    action: () => {},
  },
  {
    icon: "/assets/video-camera.svg",
    action: () => {},
  },
  {
    icon: "/assets/information.svg",
    action: () => {},
  },
];

const messages = [
  {
    date: "August 15, 2021",
    messages: [
      {
        image: "/assets/user.png",
        message:
          "Welcome to UI HUT! Whether you're opening a new online store or are interested in using UI HUT as your platform, you can find out more information about your options here.",
        time: "9h ago",
        isMe: false,
      },
      {
        image: "/assets/user.png",
        message:
          "After you register for a free trial, follow the initial setup guide to start using Weavesocial. The initial setup guide features step-by-step tutorials for the main tasks you need to complete before you start selling.",
        time: "5h ago",
        isMe: true,
      },
      {
        image: "/assets/user.png",
        message: "Sweet! Where do I sign up! Take my money!",
        time: "5h ago",
        isMe: true,
      },
      {
        image: "/assets/user.png",
        message: `visit our website from my profile and create an account. Then go "pricing" and select a plan.`,
        time: "30m ago",
        isMe: false,
      },
      {
        image: "/assets/user.png",
        message: "Okay. I'm trying to do this. thanks for explaining.",
        time: "just now",
        isMe: true,
      },
    ],
  },
  {
    date: "yesterday",
    messages: [
      {
        image: "/assets/user.png",
        message:
          "Welcome to UI HUT! Whether you're opening a new online store or are interested in using UI HUT as your platform, you can find out more information about your options here.",
        time: "9h ago",
        isMe: false,
      },
      {
        image: "/assets/user.png",
        message:
          "After you register for a free trial, follow the initial setup guide to start using Weavesocial. The initial setup guide features step-by-step tutorials for the main tasks you need to complete before you start selling.",
        time: "5h ago",
        isMe: true,
      },
      {
        image: "/assets/user.png",
        message: "Sweet! Where do I sign up! Take my money!",
        time: "5h ago",
        isMe: true,
      },
      {
        image: "/assets/user.png",
        message: `visit our website from my profile and create an account. Then go "pricing" and select a plan.`,
        time: "30m ago",
        isMe: false,
      },
      {
        image: "/assets/user.png",
        message: "Okay. I'm trying to do this. thanks for explaining.",
        time: "just now",
        isMe: true,
      },
    ],
  },
  {
    date: "today",
    messages: [
      {
        image: "/assets/user.png",
        message:
          "Welcome to UI HUT! Whether you're opening a new online store or are interested in using UI HUT as your platform, you can find out more information about your options here.",
        time: "9h ago",
        isMe: false,
      },
      {
        image: "/assets/user.png",
        message:
          "After you register for a free trial, follow the initial setup guide to start using Weavesocial. The initial setup guide features step-by-step tutorials for the main tasks you need to complete before you start selling.",
        time: "5h ago",
        isMe: true,
      },
      {
        image: "/assets/user.png",
        message: "Sweet! Where do I sign up! Take my money!",
        time: "5h ago",
        isMe: true,
      },
      {
        image: "/assets/user.png",
        message: `visit our website from my profile and create an account. Then go "pricing" and select a plan.`,
        time: "30m ago",
        isMe: false,
      },
      {
        image: "/assets/user.png",
        message: "Okay. I'm trying to do this. thanks for explaining.",
        time: "just now",
        isMe: true,
      },
      {
        image: "/assets/user.png",
        message: "Okay, Thanks.",
        time: "just now",
        isMe: false,
      },
    ],
  },
];

export default function Message() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/messages" className={styles.backArrow}>
          <Image
            src="/assets/back-arrow.svg"
            alt="user"
            width={16}
            height={16}
          />
        </Link>

        <div className={styles.headerMain}>
          <div className={styles.headerContent}>
            <Image
              src="/assets/user.png"
              alt="user"
              width={40}
              height={40}
              className={styles.messengerMobile}
            />
            <Image
              src="/assets/user.png"
              alt="user"
              width={50}
              height={50}
              className={styles.messengerWeb}
            />

            <div className={styles.headerTexts}>
              <p className={styles.headerName}>Jagrit Pratap Bill</p>
              <div className={styles.headerStatusWrapper}>
                <p className={styles.headerStatus}>Active now</p>
                <div className={styles.statusIndicator}></div>
              </div>
            </div>
          </div>

          <div className={styles.headerActions}>
            {headerActions.map((action) => (
              <div onClick={action.action} className={styles.headerAction}>
                <Image src={action.icon} alt="actions" width={16} height={16} />
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.main}>
        {!messages.length ? (
          <p className={styles.noChat}>
            • Start converaation with Jagrit Pratap Bill •
          </p>
        ) : (
          messages.map((message) => (
            <div key={message.date} className={styles.messageDayWrapper}>
              <p className={styles.messageDayWrapperDate}>{message.date}</p>

              <div className={styles.messages}>
                {message.messages.map((message, index) => (
                  <div key={index} className={styles.message}>
                    <div
                      className={[
                        styles.messageMain,
                        message.isMe && styles.messageMainReverse,
                      ].join(" ")}
                    >
                      <div className={styles.messager}>
                        <Image
                          src={message.image}
                          alt="message user"
                          width={40}
                          height={40}
                        />
                      </div>

                      <p
                        className={[
                          styles.messageText,
                          !message.isMe && styles.messageTextFriend,
                        ].join(" ")}
                      >
                        {message.message}
                      </p>

                      <div className={styles.moreOptions}>
                        <Image
                          src="/assets/more.svg"
                          alt="more icon"
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>

                    <p
                      className={[
                        styles.messageTime,
                        message.isMe && styles.messageTimeMe,
                      ].join(" ")}
                    >
                      {message.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.inputWrapper}>
        <div className={styles.inputWrapperMain}>
          <div className={styles.input} contentEditable />

          <div className={styles.inputLinksWrapper}>
            <div className={styles.inputLinkWrapper}>
              <Image src="/assets/link.svg" alt="link" width={16} height={16} />
            </div>

            <div className={styles.inputLinkWrapper}>
              <Image
                src="/assets/emoji.svg"
                alt="emoji"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>

        <button title="send message" className={styles.sendButton}>
          <Image
            src="/assets/send.svg"
            alt="send message"
            width={16}
            height={16}
            className={styles.sendButtonIconMobile}
          />
          <Image
            src="/assets/send.svg"
            alt="send message"
            width={26}
            height={26}
            className={styles.sendButtonIconWeb}
          />
        </button>
      </div>
    </div>
  );
}
