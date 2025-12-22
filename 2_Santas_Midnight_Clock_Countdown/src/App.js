import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Santa from "./Assets/Images/Cool_santa.png";

const App = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const passedMinutes = time.getHours() * 60 + time.getMinutes();
  const passedSeconds = passedMinutes * 60 + time.getSeconds();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={Santa} alt="Santa"></img>
          </div>
          <h1>Santa's Clock</h1>
        </div>
        <div className={styles.clock}>
          <div className={styles.time}>
            {hours}
            <span className={styles.blinking_colon}>:</span>
            {minutes}
          </div>
          <div className={styles.time_passed}>
            <p>
              <span>Minutes passed:</span>m = {passedMinutes}
            </p>
            <p>
              <span>Seconds passed:</span>s = {passedSeconds}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
