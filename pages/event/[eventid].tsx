import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { EventResult } from "../api/event";

import { Loader } from "../../components/Loader";

import styles from "../../styles/Home.module.css";

const EventDetails: NextPage = () => {
  const router = useRouter();
  const { eventid } = router.query;

  const { data: event } = useQuery<EventResult>(["event", eventid], () =>
    fetch(`/api/event?eventid=${eventid}`).then((res) => res.json())
  );

  return (
    <div className={styles.container}>
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
        {!event ? (
          <Loader />
        ) : (
          <>
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

                  {dish.recipe && (
                    <a target="_blank" rel="noreferrer" href={dish.recipe}>
                      Rezept
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default EventDetails;
