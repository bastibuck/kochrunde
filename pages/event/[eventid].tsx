import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import {
  eventQuery,
  EventResult,
  eventsQuery,
  EventsResult,
} from "../../queries/event";
import { client } from "../../queries/client";

import styles from "../../styles/Home.module.css";
import { Loader } from "../../components/Loader";

const variants = {
  hidden: { x: "100%", width: "100%" },
  enter: { x: 0, width: "100%" },
  exit: { x: "100%", width: "100%" },
};

const EventDetails = ({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      <Head>
        <title>Event-Details | Kochrunde App</title>
        <meta name="description" content="Event-Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href={"/"}>
        <a>
          <p style={{ textAlign: "left", position: "absolute", left: 20 }}>
            &larr; Zurück
          </p>
        </a>
      </Link>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {new Date(event.date).toLocaleDateString()}
        </h1>
        <h2>{event.cook.name}</h2>

        <div className={styles.grid}>
          {event.dishes.map((dish) => (
            <div className={styles.card} key={dish.name}>
              <h2>{dish.name}</h2>

              {dish.image && (
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 9",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    src={dish.image}
                    alt={`Foto vom Gericht ${dish.name}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}

              {dish.recipes.map((recipe, index) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={recipe}
                  key={recipe}
                  style={{ display: "block", marginBottom: 10 }}
                >
                  Rezept {dish.recipes.length > 1 ? `#${index}` : ""}
                </a>
              ))}
            </div>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default EventDetails;

export const getStaticProps: GetStaticProps<{ event: EventResult }> = async (
  context
) => {
  const event = await client.fetch<EventResult | null>(eventQuery, {
    id: context.params?.eventid,
  });

  if (event === null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 1800, // only rebuild once every 30 minutes
  };
};

export const getStaticPaths: GetStaticPaths<{ eventid: string }> = async () => {
  const events = await client.fetch<EventsResult>(eventsQuery);

  return {
    paths: events.map((event) => ({ params: { eventid: event._id } })),
    fallback: true,
  };
};
