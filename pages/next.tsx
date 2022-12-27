import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import type { PageProps } from "./_app";
import {
  maxEventsCount,
  upcomingCooksQuery,
  UpcomingCooksResult,
} from "../queries/cook";
import { client } from "../queries/client";

import styles from "../styles/Home.module.css";

const Next = ({ upcoming }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.grid}>
      {upcoming.map((cook) => (
        <div className={styles.card} key={cook._id}>
          <h2 style={{ margin: 0 }}>{cook.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Next;

export const getStaticProps: GetStaticProps<
  PageProps & { upcoming: UpcomingCooksResult }
> = async (_context) => {
  const maxCount = await client.fetch<number>(maxEventsCount);
  const upcoming = await client.fetch<UpcomingCooksResult>(upcomingCooksQuery, {
    maxCount,
  });

  return {
    props: {
      metaTitle: "Wer ist noch dran? | Kochrunde",
      metaDescription: "Wer hat diese Runde noch nicht gekocht?",
      title: "Wer ist noch dran?",

      upcoming,
    },
  };
};
