import { useState } from "react";
import styles from "./App.module.css";
import digits from "./assets/data/digitsArray";

const App = () => {
  const [time, setTime] = useState(10);

  const countdown = () => {};

  return (
    <div className={styles.wrapper}>
      <button>Start the Countdown</button>
    </div>
  );
};

export default App;
