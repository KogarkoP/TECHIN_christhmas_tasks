import { useState } from "react";
import styles from "./App.module.css";
import Santa from "./Assets/Images/Santa.png";

const App = () => {
  const [rows, setRows] = useState("");
  const [seats, setSeats] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({});

  const calculateNumberOfSeats = () => {
    const newErrors = {};

    if (!rows.trim()) {
      newErrors.rows = "Rows quantity is required field";
    } else if (isNaN(rows)) {
      newErrors.rows = "Rows quantity must be a number";
    } else if (rows.includes(".")) {
      newErrors.rows = "Rows quantity must be whole number";
    }

    if (!seats.trim()) {
      newErrors.seats = "Seats quantity is required field";
    } else if (isNaN(seats)) {
      newErrors.seats = "Seats quantity must be a number";
    } else if (seats.includes(".")) {
      newErrors.seats = "Seats quantity must be whole number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const seatsNumber = Number(seats);
    let totalSeats = 0;

    for (let i = 0; i < rows; i++) {
      totalSeats += seatsNumber + i * 2;
    }

    setResult(totalSeats);
  };

  const clearData = () => {
    setRows("");
    setSeats("");
    setResult("");
    setErrors({});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={Santa} alt="Santa"></img>
          </div>
          <h1>Santa’s Christmas Concert Seating Plan</h1>
        </div>
        <div className={styles.form_row}>
          <label htmlFor="rows">Rows quantity</label>
          <input
            id="rows"
            type="text"
            placeholder="Rows quantity"
            value={rows}
            onChange={(e) => {
              setRows(e.target.value);
              setErrors((prev) => {
                const { rows, ...res } = prev;
                return res;
              });
            }}
          />
          {errors.rows && <p className={styles.field_error}>{errors.rows}</p>}
        </div>
        <div className={styles.form_row}>
          <label htmlFor="seats">Seats in first row</label>
          <input
            id="seats"
            type="text"
            placeholder="Seats quantity"
            value={seats}
            onChange={(e) => {
              setSeats(e.target.value);
              setErrors((prev) => {
                const { seats, ...res } = prev;
                return res;
              });
            }}
          />
          {errors.seats && <p className={styles.field_error}>{errors.seats}</p>}
        </div>
        <div className={styles.button_wrapper}>
          <button onClick={calculateNumberOfSeats}>Calculate</button>
          <button className={styles.clear_btn} onClick={clearData}>
            Clear
          </button>
        </div>
        {result && (
          <div className={styles.total_wrapper}>
            <span className={styles.total_area}>Total number of seats:</span>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
