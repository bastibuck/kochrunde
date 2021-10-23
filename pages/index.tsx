import type { NextPage } from "next";

import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import type { EventsResult } from "./api/events";

const events: EventsResult = [
  {
    _id: "abad0e68-eb6a-4715-a6d9-1eaa17345e92",
    cook: { name: "Basti" },
    date: "2021-10-23T19:10:14.610Z",
  },
  {
    _id: "5c356240-0e08-4b7a-9f1b-8b0d0250be0a",
    cook: { name: "Luisa" },
    date: "2021-10-19T19:26:00.000Z",
  },
];

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kochrunde</title>
        <meta
          name="description"
          content="Events- und Rezeptsammlung der Kochrunde"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Kochrunde</h1>

        <p className={styles.description}>
          Endlich eine Sammlung der gekochten Rezepte 😉
        </p>

        <div className={styles.grid}>
          {events.map((event) => (
            <Link href={`/event/${event._id}`} key={event._id}>
              <a className={styles.card}>
                <h2>{new Date(event.date).toLocaleDateString()} &rarr;</h2>
                <p>{event.cook.name}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
