import classes from "./MainNavigation.module.css";
import Link from "next/Link";
import { useRouter } from "next/router";
import {  useContext } from "react";
import AuthContext from "../../store/auth-context";



function MainNavigation() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  console.log(isLoggedIn);


  const logoutHandler = () => {
    authCtx.logout();
    router.push("/");
  };

  // console.log(isLoggedIn);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Auth</div>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link href="/">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link href="/home">Home</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
