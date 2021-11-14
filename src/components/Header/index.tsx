import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
const Header = () => {
  const { pathname } = useLocation();

  console.log();
  return (
    <header className={styles.header}>
      <h2>Top Candidates</h2>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={`tab-link ${
            pathname.substr(1) === "" && "tab-link-active"
          }`}
        >
          Home
        </Link>
        <Link
          to="/shortlisted"
          className={`tab-link ${
            pathname.substr(1) === "shortlisted" && "tab-link-active"
          }`}
        >
          Shortlisted
        </Link>
        <Link
          to="/rejected"
          className={`tab-link ${
            pathname.substr(1) === "rejected" && "tab-link-active"
          }`}
        >
          Rejected
        </Link>
      </nav>
    </header>
  );
};

export default Header;
