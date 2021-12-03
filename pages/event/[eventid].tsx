import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { Rating } from "react-simple-star-rating";
import { useCookie } from "react-use";

import {
  eventQuery,
  EventResult,
  eventsQuery,
  EventsResult,
} from "../../queries/event";
import { client } from "../../queries/client";

import styles from "../../styles/Home.module.css";
import { Loader } from "../../components/Loader";
import { PageProps } from "../_app";

import { DishRatingResult } from "../../queries/dish";

const DishRating: React.FC<{ id: string }> = ({ id }) => {
  const [voted, updateCookie] = useCookie(`dish-voted-${id}`);

  const query = useQuery<DishRatingResult>(["rating", id, voted], () =>
    fetch(`/api/rating?id=${id}`).then((dish) => dish.json())
  );

  const mutateRating = useMutation((rating: string) =>
    fetch(`/api/set-rating?id=${id}&rating=${rating}`)
  );

  const handleRating = async (rate: number) => {
    if (voted === null) {
      const rating = ((rate / 100) * 5).toString();
      const res = await mutateRating.mutateAsync(rating);

      if (res.status === 200) {
        updateCookie(rating, { expires: 365 * 10 });
      }
    }
  };

  return (
    <div style={{ textAlign: "right", minHeight: 45 }}>
      {!query.isLoading && !query.isIdle && !query.isError ? (
        <>
          <Rating
            transition
            allowHalfIcon
            onClick={handleRating}
            readonly={voted !== null}
            ratingValue={
              query.data.rating.length
                ? query.data.rating.reduce((acc, rate) => acc + rate, 0) /
                  query.data.rating.length
                : 0
            }
          />
          {voted !== null ? <div>Dein Vote: {voted}</div> : null}
        </>
      ) : null}
    </div>
  );
};

const EventDetails = ({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className={styles.grid}>
      {event.dishes.map((dish) => (
        <div className={styles.card} key={dish.name}>
          <h2>{dish.name}</h2>

          {dish.image && dish.imageBlurred && (
            <div
              style={{
                position: "relative",
                marginBottom: 20,
              }}
              className={styles.aspect16_9}
            >
              <Image
                src={dish.image}
                alt={`Foto vom Gericht ${dish.name}`}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={dish.imageBlurred}
              />
            </div>
          )}

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            <div>
              {dish.recipes.map((recipe, index) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={recipe}
                  key={recipe}
                  style={{
                    display: "block",
                    marginBottom: 10,
                  }}
                >
                  Rezept {dish.recipes.length > 1 ? `#${index + 1}` : ""}
                </a>
              ))}
            </div>

            <DishRating id={dish._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventDetails;

export const getStaticProps: GetStaticProps<
  PageProps & { event: EventResult }
> = async (context) => {
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
      metaTitle: "Event-Details | Kochrunde App",
      metaDescription: "Event-Details",
      backLink: "/",
      title: new Date(event.date).toLocaleDateString(),
      description: event.cook.name,
      hideNav: true,

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
