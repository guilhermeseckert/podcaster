import styles from "./styles.module.scss";
import formt from "date-fns/format";

export function Header() {
  const currentDate = formt(new Date(), "yyy, eee MMM d");

  return (
    <header className={styles.headercontainer}>
      <img src="/logo.svg" alt="podcaster" />
      <p>O melhor para voce ouvir, Sempre</p>
      <span>{currentDate}</span>
    </header>
  );
}
