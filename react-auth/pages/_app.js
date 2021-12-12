import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import { AuthContextProvider } from "../store/auth-context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
