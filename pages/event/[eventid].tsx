import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../../styles/Home.module.css";

const EventDetails: NextPage = () => {
  const router = useRouter();
  const { eventid } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Event-Details | Kochrunde App</title>
        <meta name="description" content="Event-Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Event Details {eventid}</h1>
      </main>
    </div>
  );
};

export default EventDetails;
