import Layout from "@/components/Layout/Layout";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}
