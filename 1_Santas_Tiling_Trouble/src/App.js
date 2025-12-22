import { useState } from "react";
import styles from "./App.module.css";
import Santa from "./Assets/Images/Santa.png";

const App = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [m2price, setM2Price] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [errors, setErrors] = useState({});

  const calculateTilePrice = () => {
    const newErrors = {};
    const convertedLength = length.replace(",", ".");
    const convertedWidth = width.replace(",", ".");

    if (!length.trim()) {
      newErrors.length = "Length is required";
    } else if (isNaN(convertedLength)) {
      newErrors.length = "Length must be a number";
    } else if (convertedLength.includes(".")) {
      newErrors.length = "Length must be whole number";
    }

    if (!width.trim()) {
      newErrors.width = "Width is required";
    } else if (isNaN(convertedWidth)) {
      newErrors.width = "Width must be a number";
    } else if (convertedWidth.includes(".")) {
      newErrors.width = "Width must be whole number";
    }

    const numericPrice = Number(m2price.replace(",", "."));

    if (isNaN(numericPrice)) newErrors.price = "Price must be a numebr";
    if (numericPrice <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const area = Number(length) * Number(width);
    const areWithExtra = area * 1.05;
    const price = areWithExtra * numericPrice;
    setTotalArea(areWithExtra.toFixed(2).replace(".", ","));
    setTotalCost(price.toFixed(2).replace(".", ","));
  };

  const clearData = () => {
    setLength("");
    setWidth("");
    setM2Price("");
    setTotalArea("");
    setTotalCost("");
    setErrors({});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={Santa} alt="Santa"></img>
          </div>
          <h1>Santa's Tile Calculator</h1>
        </div>
        <div className={styles.form_row}>
          <label htmlFor="length">Length, m</label>
          <input
            id="length"
            type="text"
            placeholder="Length"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
              setErrors((prev) => {
                const { length, ...res } = prev;
                return res;
              });
            }}
          />
          {errors.length && (
            <p className={styles.field_error}>{errors.length}</p>
          )}
        </div>
        <div className={styles.form_row}>
          <label htmlFor="width">Width, m</label>
          <input
            id="width"
            type="text"
            placeholder="Width"
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
              setErrors((prev) => {
                const { width, ...res } = prev;
                return res;
              });
            }}
          />
          {errors.width && <p className={styles.field_error}>{errors.width}</p>}
        </div>
        <div className={styles.form_row}>
          <label htmlFor="price">Price, € for m²</label>
          <input
            id="price"
            type="text"
            placeholder="Price"
            value={m2price}
            onChange={(e) => {
              setM2Price(e.target.value);
              setErrors((prev) => {
                const { price, ...res } = prev;
                return res;
              });
            }}
          />
          {errors.price && <p className={styles.field_error}>{errors.price}</p>}
        </div>
        <div className={styles.button_wrapper}>
          <button onClick={calculateTilePrice}>Calculate</button>
          <button className={styles.clear_btn} onClick={clearData}>
            Clear
          </button>
        </div>
        {totalCost && (
          <div className={styles.total_wrapper}>
            <div>
              <span className={styles.total_area}>Total Area:</span>
              {`${totalArea} m² (including 5% extra)`}
            </div>
            <div>
              <span className={styles.total}>Total:</span>
              {totalCost} €
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
