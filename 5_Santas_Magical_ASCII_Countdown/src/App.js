import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { DIGITS } from "./assets/data/digitsArray";

const App = () => {
  const [time, setTime] = useState(10);
  const [number, setNumber] = useState([]);
  const [message, setMessage] = useState("");
  const messages = {
    10: "🎅✨ Santa is preparing… ✨🎅",
    7: "🎅✨ Reindeer are buckling up… ✨🎅",
    5: "🎅✨ Sleigh warming up... ✨🎅",
    3: "🎅✨ Almost ready... ✨🎅",
    0: "🎅✨ SANTA’S SLEIGH IS LAUNCHING!!!!! ✨🎅",
  };

  const combineDigits = (digits) => {
    return digits[0].map((_, rowIndex) =>
      digits.map((digit) => digit[rowIndex]).join("  ")
    );
  };

  const getDigitColor = (time) => {
    if (time > 7) return "red";
    if (time > 3) return "gold";
    return "green";
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) return 0;
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (time === 10) {
      const combined = combineDigits([DIGITS[1], DIGITS[0]]);
      setNumber(combined);
    } else {
      setNumber(DIGITS[time]);
    }

    if (messages[time]) setMessage(messages[time]);
  }, [time]);

  return (
    <div className={styles.wrapper}>
      <pre className={styles.digit} style={{ color: getDigitColor(time) }}>
        {number.join("\n")}
      </pre>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default App;
