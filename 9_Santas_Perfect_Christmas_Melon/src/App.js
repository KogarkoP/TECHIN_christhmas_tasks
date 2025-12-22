import { useState } from "react";
import styles from "./App.module.css";
import Melon from "./Assets/Images/melon.png";

const App = () => {
  const [melonWeight, setMelonWeight] = useState("");
  const [melonsWeights, setMelonsWeights] = useState([]);
  const [weightResult, setWeightResult] = useState("");
  const [melonNumber, setMelonNumber] = useState("");
  const [insertError, setInsertError] = useState("");
  const [findError, setFindError] = useState("");

  const insertMelonWeight = () => {
    if (!melonWeight.trim()) {
      setInsertError("Melon weight is required field");
      return;
    } else if (isNaN(melonWeight)) {
      setInsertError("Melon weight must be a number");
      return;
    }

    setMelonsWeights((prev) => {
      return [...prev, +melonWeight];
    });

    setMelonWeight("");
    setWeightResult("");
    setMelonNumber("");
    setFindError("");
  };

  const findPerfectMelon = () => {
    if (melonsWeights.length === 0) {
      setFindError("Please insert melon weight");
      return;
    }

    let sum = 0;

    melonsWeights.forEach((melon) => {
      sum += melon;
    });

    const averageMelonsWeight = sum / melonsWeights.length;

    setWeightResult(averageMelonsWeight.toFixed(2));

    let smallestDiff = Math.abs(averageMelonsWeight - melonsWeights[0]);
    let closest = 0;

    for (let i = 0; i < melonsWeights.length; i++) {
      let currentDiff = Math.abs(averageMelonsWeight - melonsWeights[i]);
      if (currentDiff < smallestDiff) {
        smallestDiff = currentDiff;
        closest = i;
      }
    }

    setMelonNumber(closest + 1);
  };

  const clearData = () => {
    setMelonWeight("");
    setMelonsWeights([]);
    setWeightResult("");
    setMelonNumber("");
    setInsertError("");
    setFindError("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={Melon} alt="Christmas melon"></img>
          </div>
          <h1>Santa’s Perfect Christmas Melon</h1>
        </div>
        <div className={styles.form_row}>
          <label htmlFor="melon">Melon weight</label>
          <input
            id="melon"
            type="text"
            placeholder="Melon weight"
            value={melonWeight}
            onChange={(e) => {
              setMelonWeight(e.target.value);
              setInsertError("");
              setFindError("");
            }}
          />
          {insertError && <p className={styles.field_error}>{insertError}</p>}
          <button className={styles.insert_btn} onClick={insertMelonWeight}>
            Insert Melon Weight
          </button>
        </div>
        <div className={styles.button_wrapper}>
          <button onClick={findPerfectMelon}>Find Melon</button>
          <button className={styles.clear_btn} onClick={clearData}>
            Clear
          </button>
        </div>
        {findError && <p className={styles.field_error}>{findError}</p>}
      </div>
      <div className={styles.result_wrapper}>
        {melonsWeights.length > 0 && (
          <>
            <h2>Inserted Melons Weights</h2>
            <div className={styles.inserted_melons}>
              {melonsWeights.join(", ")}
            </div>
          </>
        )}
        {melonNumber && weightResult && (
          <>
            <h2>Perfect Christmas Melon</h2>
            <div className={styles.melon_data}>
              <span>Melon Number: {melonNumber}</span>
              <span>Average Weight: {weightResult}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
