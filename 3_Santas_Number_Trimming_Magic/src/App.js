import { useState } from "react";
import styles from "./App.module.css";
import SantasWand from "./Assets/Images/Santas_wand.png";

const App = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [trimmedNumber, setTrimmedNumber] = useState("");

  const trimNumber = () => {
    if (
      number.includes(".") ||
      number.includes(",") ||
      isNaN(number) ||
      number.length < 4
    ) {
      setError("Please enter 4 digit whole number");
      return;
    } else if (number[0] === "0") {
      setError("Number shouldn't start from 0");
      return;
    }

    const firstNumber = number.charAt(0);
    const lastNumber = number.charAt(number.length - 1);

    setTrimmedNumber(firstNumber + lastNumber);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={SantasWand} alt="Santas Wand"></img>
          </div>
          <h1>Santa’s Number-Trimming Magic</h1>
        </div>
        <div className={styles.form_row}>
          <label htmlFor="number">Please enter 4 digit whole number</label>
          <input
            id="number"
            type="text"
            placeholder="Number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              setError("");
              setTrimmedNumber("");
            }}
          />
          {error && <p className={styles.field_error}>{error}</p>}
        </div>
        <button className={styles.trim_button} onClick={trimNumber}>
          Trim Number
        </button>
        {trimmedNumber && (
          <div className={styles.result_wrapepr}>
            <p>
              <span className={styles.result}>Result:</span> {trimmedNumber}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
