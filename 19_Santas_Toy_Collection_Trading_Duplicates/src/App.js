import { useState } from "react";
import styles from "./App.module.css";
import Cookie from "./Assets/Images/cookie.png";

const App = () => {
  const [toyQuantity, setToyQuantity] = useState("");
  const [toyNumbers, setToyNumbers] = useState([]);
  const [toyDuplicates, setToyDuplicates] = useState([]);
  const [insertError, setInsertError] = useState("");

  const findToyDuplicates = () => {
    if (!toyQuantity.trim()) {
      setInsertError("Toy quantity is required field");
      return;
    }

    if (isNaN(toyQuantity)) {
      setInsertError("Toy quantity must be a number");
      return;
    }

    if (toyQuantity <= 0) {
      setInsertError("Toy quantity can't be 0 or less");
      return;
    }

    if (toyQuantity > 100) {
      setInsertError("Santa has only 100 toys");
      return;
    }

    let numbersOfToys = [];

    for (let i = 0; i < toyQuantity; i++) {
      let toyNumber = Math.floor(Math.random() * 100) + 1;
      numbersOfToys.push(toyNumber);
    }

    const duplicates = numbersOfToys.filter(
      (toy, index, arr) => arr.indexOf(toy) !== index
    );

    const uniqueDuplicates = [...new Set(duplicates)];

    setToyNumbers(numbersOfToys);
    setToyDuplicates(uniqueDuplicates);

    setToyQuantity("");
  };

  const clearData = () => {
    setToyNumbers([]);
    setToyDuplicates([]);
    setInsertError("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={Cookie} alt="Cookie"></img>
          </div>
          <h1>Santa’s Toy Collection – Trading Duplicates</h1>
        </div>
        <div className={styles.form_row}>
          <label htmlFor="toy_quantity">
            How many toys does Binky Frostynose have?
          </label>
          <input
            id="toy_quantity"
            type="text"
            placeholder="Toy quantity"
            value={toyQuantity}
            onChange={(e) => {
              setToyQuantity(e.target.value);
              setInsertError("");
            }}
          />
          {insertError && <p className={styles.field_error}>{insertError}</p>}
        </div>
        <div className={styles.button_wrapper}>
          <button onClick={findToyDuplicates}>Find Duplicates</button>
          <button className={styles.clear_btn} onClick={clearData}>
            Clear
          </button>
        </div>
      </div>
      {toyNumbers.length > 0 && (
        <div className={styles.result_wrapper}>
          <p>
            <b>Binky Frostynose toy quantity:</b> {toyNumbers.length}
          </p>
          <h4>Binky Frostynose’s toy numbers</h4>
          <p>{[...toyNumbers].sort((a, b) => a - b).join(" ")}</p>
          {toyDuplicates.length > 0 ? (
            <>
              <h4>Binky Frostynose’s will trade toys with this numbers</h4>
              <p>{[...toyDuplicates].sort((a, b) => a - b).join(" ")}</p>
            </>
          ) : (
            <h4 className={styles.nothing}>Nothing to trade!!!</h4>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
