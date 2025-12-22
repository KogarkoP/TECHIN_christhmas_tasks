import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Santa from "./Assets/Images/Cool_santa.png";

const App = () => {
  const [time, setTime] = useState(new Date());
  const [offsetMinutes, setOffsetMinutes] = useState(0);
  const displayTime = new Date(time);
  displayTime.setMinutes(displayTime.getMinutes() + offsetMinutes);

  const hours = String(displayTime.getHours()).padStart(2, "0");
  const minutes = String(displayTime.getMinutes()).padStart(2, "0");

  const spinHand = () => {
    setOffsetMinutes((prev) => prev + 60);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={Santa} alt="Santa"></img>
          </div>
          <h1>Santa’s Spinning Clock Mystery</h1>
        </div>
        <div className={styles.clock}>
          <div className={styles.time}>
            {hours}
            <span className={styles.blinking_colon}>:</span>
            {minutes}
          </div>
        </div>
        <button className={styles.spin_btn} onClick={spinHand}>
          Spin
        </button>
      </div>
    </div>
  );
};

export default App;
