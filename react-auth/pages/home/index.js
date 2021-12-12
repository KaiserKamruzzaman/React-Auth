import { useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  console.log(isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <h1>Welcome to Home....</h1>
    </>
  );
};

export default HomePage;
