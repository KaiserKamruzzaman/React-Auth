import classes from "./MainNavigation.module.css";
import Link from "next/Link";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Auth</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Login</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
