import { use, useState } from "react";
import styles from "./App.module.css";
import Gift from "./Assets/Images/Gift.png";

const App = () => {
  const [price, setPrice] = useState("");
  const [giftsPrices, setGifstPrices] = useState([]);
  const [result, stResult] = useState();
  const [error, setError] = useState("");

  const addPrice = () => {};

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
          <label htmlFor="nprice">Please enter the price of gift</label>
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
        <button className={styles.trim_button} onClick={addPrice}>
          Add price
        </button>
        {/*&& (
          <div className={styles.result_wrapepr}>
            <p>
              <span className={styles.result}>Result:</span>
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default App;
