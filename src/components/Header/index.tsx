import styles from "./styles.module.scss";
import formt from "date-fns/format";

export function Header() {
  const currentDate = formt(new Date(), "yyy, eee MMM d");

  return (
    <header className={styles.headercontainer}>
      <img src="/logo.svg" alt="podcaster" />
      <p>The best for you listening, ever</p>
      <span>{currentDate}</span>
    </header>
  );
}
