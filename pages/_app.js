import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ToastContainer limit={1} autoClose={2000} />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;