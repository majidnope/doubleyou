import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DoubleYou</title>
        <meta name="description" content="Enjoy the knowledge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
