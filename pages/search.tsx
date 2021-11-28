import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { client } from "../queries/client";

import styles from "../styles/Home.module.css";
import { PageProps } from "./_app";
import { dishesQuery, DishesResult } from "../queries/dish";

const Search = ({ dishes }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.grid}>
      {dishes.length === 0 ? (
        <div>Keine Treffer...</div>
      ) : (
        dishes.map((dish) => (
          <div
            key={dish._id}
            className={styles.card}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 20,
            }}
          >
            <h3>{dish.name}</h3>

            <div style={{ width: 200 }}>
              {dish.image ? (
                <div
                  style={{
                    position: "relative",
                  }}
                  className={styles.aspect1_1}
                >
                  <Image
                    src={dish.image}
                    alt={`Foto vom Gericht ${dish.name}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ) : (
                <div
                  style={{
                    position: "relative",
                    background: "hsl(0 0% 90%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                  className={styles.aspect1_1}
                >
                  Kein Bild
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Search;

export const getStaticProps: GetStaticProps<
  PageProps & { dishes: DishesResult }
> = async (_context) => {
  const dishes = await client.fetch<DishesResult>(dishesQuery, { search: "" });

  return {
    props: {
      metaTitle: "Rezeptsuche | Kochrunde",
      metaDescription: "Durchsuche die Rezepte der Kochrunde",
      title: "Rezeptsuche",

      dishes,
    },
  };
};
