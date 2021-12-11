import classes from "./MainNavigation.module.css";
import Link from "next/Link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// let item;
// if (typeof window !== 'undefined') {
//   item = localStorage.getItem('token');
// }

function MainNavigation() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("token");
      if (item) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  console.log(isLoggedIn);

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

          { isLoggedIn && 
            <li>
            <Link href="/home">Home</Link>
          </li>
          }
          
          { isLoggedIn &&
            <li>
            <button>Logout</button>
          </li>
          }
          
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
