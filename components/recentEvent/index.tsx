import Image from "next/image";
import styles from "./index.module.css";
import { Reactors } from "..";

const events = [
  {
    image: "/assets/event.png",
    header: "Graduation Ceremony",
    body: "The graduation ceremony is also sometimes called...",
    seen: 8,
    seenImages: ["/assets/user.png"],
  },
  {
    image: "/assets/event.png",
    header: "Graduation Ceremony",
    body: "The graduation ceremony is also sometimes called...",
    seen: 8,
    seenImages: ["/assets/user.png"],
  },
];

export default function RecentEvent() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.headerName}>Recent Event</h3>
        <Image src="/assets/more.svg" alt="more" width={16} height={16} />
      </div>

      <div className={styles.events}>
        {events.map((event, index) => (
          <div className={styles.event} key={index}>
            <div className={styles.eventHeader}>
              <Image
                src="/assets/event.png"
                alt="event"
                width={45}
                height={45}
                className={styles.eventImage}
              />
              <div className={styles.eventContent}>
                <h3 className={styles.eventheading}>{event.header}</h3>
                <p className={styles.eventBody}>{event.body}</p>
              </div>
            </div>

            <div className={styles.reactions}>
              <p className={styles.seenNo}>{`${event.seen} seen`}</p>
              <Reactors
                images={[
                  "/assets/user.png",
                  "/assets/user.png",
                  "/assets/user.png",
                  "/assets/user.png",
                ]}
                noOfReactions="5"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
