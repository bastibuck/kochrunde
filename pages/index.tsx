import type { NextPage } from "next";
import { useQuery } from "react-query";

import Head from "next/head";
import Link from "next/link";

import type { EventsResult } from "./api/events";

import { Loader } from "../components/Loader";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { data: events } = useQuery<EventsResult, unknown, EventsResult>(
    "events",
    () => fetch("/api/events").then((res) => res.json()),
    {
      initialData: [],
    }
  );

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
          {events === undefined || events.length === 0 ? (
            <Loader />
          ) : (
            events.map((event) => (
              <Link href={`/event/${event._id}`} key={event._id}>
                <a className={styles.card}>
                  <h2>{new Date(event.date).toLocaleDateString()} &rarr;</h2>
                  <p>{event.cook.name}</p>
                </a>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
