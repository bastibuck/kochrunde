import type { AppProps as NextAppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";

import "../styles/globals.css";
import styles from "../styles/Home.module.css";

export type PageProps = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description?: string;
  backLink?: string;
  hideNav?: boolean;
};

type AppProps = {
  pageProps: PageProps;
} & Omit<NextAppProps<PageProps>, "pageProps">;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{pageProps.metaTitle}</title>
        <meta name="description" content={pageProps.metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {pageProps.backLink !== undefined ? (
        <Link href={pageProps.backLink}>
          <a>
            <p style={{ textAlign: "left", position: "absolute", left: 20 }}>
              &larr; Zurück
            </p>
          </a>
        </Link>
      ) : null}

      <main className={styles.main}>
        <h1 className={styles.title}>{pageProps.title}</h1>

        {!pageProps.hideNav ? (
          <nav className={styles.nav}>
            <Link href="/">
              <a>Home</a>
            </Link>

            <Link href="/search">
              <a>Suche</a>
            </Link>
          </nav>
        ) : null}

        {pageProps.description ? (
          <p className={styles.description}>{pageProps.description}</p>
        ) : null}

        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
