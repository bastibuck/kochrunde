import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

import { eventsQuery, EventsResult } from "../queries/event";
import { client } from "../queries/client";

import styles from "../styles/Home.module.css";

const variants = {
  hidden: { x: "-100%" },
  enter: { x: 0 },
  exit: { x: "-100%" },
};

const Home = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
    >
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
          {events.length === 0 ? (
            <div>Bisher keine Events...</div>
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
    </motion.div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<{ events: EventsResult }> = async (
  _context
) => {
  const events = await client.fetch<EventsResult>(eventsQuery);

  return {
    props: {
      events,
    },
  };
};
