import styles from "./styles.module.scss";

export function Player() {
  return (
    <div className={styles.playercontainer}>
      <header>
        <img src="/playing.svg" alt="playing" />
        <strong>Playing now </strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Select an podcast to listen </strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>

          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="shuffle" />
          </button>

          <button type="button">
            <img src="/play-previous.svg" alt="play-previous" />
          </button>

          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="play" />
          </button>

          <button type="button">
            <img src="/play-next.svg" alt="play-next" />
          </button>

          <button type="button">
            <img src="/repeat.svg" alt="repeat" />
          </button>
        </div>
      </footer>
    </div>
  );
}
