import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

import { eventsQuery, EventsResult } from "../queries/event";
import { client } from "../queries/client";

import styles from "../styles/Home.module.css";
import { PageProps } from "./_app";

const Home = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.grid}>
      {events.length === 0 ? (
        <div>Bisher keine Events...</div>
      ) : (
        events.map((event) =>
          event.hasDishes ? (
            <Link href={`/event/${event._id}`} key={event._id}>
              <a className={styles.card}>
                <h2>{new Date(event.date).toLocaleDateString()} &rarr;</h2>
                <p>{event.cook.name}</p>
              </a>
            </Link>
          ) : (
            <div className={styles.card} key={event._id}>
              <h2>{new Date(event.date).toLocaleDateString()}</h2>
              <p>{event.cook.name}</p>
            </div>
          )
        )
      )}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<
  PageProps & { events: EventsResult }
> = async (_context) => {
  const events = await client.fetch<EventsResult>(eventsQuery);

  return {
    props: {
      metaTitle: "Kochrunde",
      metaDescription: "Events- und Rezeptsammlung der Kochrunde",
      title: "Kochrunde",
      description: "Endlich eine Sammlung der gekochten Rezepte 😉",

      events,
    },
  };
};
