import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useQuery } from "react-query";

import type { PageProps } from "./_app";
import type { DishesResult } from "../queries/dish";

import styles from "../styles/Home.module.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [results, setResults] = React.useState<DishesResult>([]);

  const query = useQuery<DishesResult>(["search", searchQuery], () =>
    fetch(`/api/dishes?search=${searchQuery}`).then((dishes) => dishes.json())
  );

  React.useEffect(() => {
    if (!query.isLoading && !query.isIdle && !query.isError) {
      setResults(query.data);
    }
  }, [query]);

  return (
    <div className={styles.grid}>
      <div style={{ position: "relative" }}>
        <input
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          style={{ padding: 10, width: 340 }}
        />
        {query.isLoading && <div className={"loader loader--inline"} />}
      </div>

      {results.length === 0 ? (
        <div style={{ margin: "2rem" }}>Keine Treffer...</div>
      ) : (
        results.map((dish) => (
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
            <div>
              <h3>{dish.name}</h3>

              {dish.recipes.map((recipe, index) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={recipe}
                  key={recipe}
                  style={{ display: "block", marginBottom: 10 }}
                >
                  Rezept {dish.recipes.length > 1 ? `#${index + 1}` : ""}
                </a>
              ))}
            </div>

            <div style={{ width: 200 }}>
              {dish.image && dish.imageBlurred ? (
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
                    placeholder="blur"
                    blurDataURL={dish.imageBlurred}
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

export const getStaticProps: GetStaticProps<PageProps> = async (_context) => {
  return {
    props: {
      metaTitle: "Rezeptsuche | Kochrunde",
      metaDescription: "Durchsuche die Rezepte der Kochrunde",
      title: "Rezeptsuche",
    },
  };
};
