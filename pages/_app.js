import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
import Context from "./utils/context";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [headerMenu, setHeaderMenu] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Context data={{ headerMenu, setHeaderMenu }}>
        <ToastContainer limit={1} autoClose={2000} />
        <Component {...pageProps} />
      </Context>
    </ApolloProvider>
  );
}

export default MyApp;
