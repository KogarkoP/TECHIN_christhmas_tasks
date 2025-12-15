import { useState } from "react";
import styles from "./App.module.css";
import Gift from "./Assets/Images/Gift.png";

const App = () => {
  const [price, setPrice] = useState("");
  const [giftsPrices, setGiftsPrices] = useState([]);
  const [totalCost, setTotalCost] = useState(null);
  const [totalToys, setTotalToys] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const addPrice = () => {
    const formatedPrice = Number(price.replace(",", "."));

    if (!price.trim() || isNaN(formatedPrice)) {
      setError("Please enter number");
      return;
    }

    if (formatedPrice < 0) {
      setError("Price cannot be negative");
      return;
    }

    if (formatedPrice === 0) {
      const expensiveToys = giftsPrices.filter((gP) => {
        return gP >= 10;
      });

      const total = expensiveToys.reduce((acc, cur) => {
        return acc + cur;
      }, 0);

      setTotalCost(total.toFixed(2).replace(".", ","));
      setTotalToys(expensiveToys.length);
      setPrice("");
      setDisabled(true);
      return;
    }

    setGiftsPrices((prev) => {
      return [...prev, formatedPrice];
    });

    setPrice("");
  };

  const cleare = () => {
    setGiftsPrices([]);
    setTotalCost("");
    setTotalToys("");
    setDisabled(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={Gift} alt="Gift"></img>
          </div>
          <h1>Gift Bag</h1>
        </div>
        <div className={styles.form_row}>
          <label htmlFor="price">Please enter gift price</label>
          <p className={styles.instructions}>
            To finish magical toy list please enter 0
          </p>
          <input
            id="price"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setError("");
            }}
          />
          {error && <p className={styles.field_error}>{error}</p>}
        </div>
        <div className={styles.button_wrapper}>
          <button
            className={styles.trim_button}
            onClick={addPrice}
            disabled={isDisabled}
          >
            Add price
          </button>
          <button onClick={cleare} disabled={!isDisabled}>
            Cleare
          </button>
        </div>
        {totalCost && (
          <div className={styles.result_wrapepr}>
            <ul className={styles.result}>
              <li>
                Total price of magical toys:<span>{totalCost} EUR</span>
              </li>
              <li>
                Number of magical toys:<span>{totalToys}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
