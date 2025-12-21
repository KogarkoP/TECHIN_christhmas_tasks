import { useState } from "react";
import styles from "./App.module.css";
import ChristmasTree from "./Assets/Images/Christmas_tree.png";

const App = () => {
  const [rowsCol, setRowsCol] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  const generateLightsPattern = () => {
    if (!rowsCol.trim()) {
      setError("Number of rows and columns is required field");
      return;
    } else if (isNaN(rowsCol)) {
      setError("Number of rows and columns must be a number");
      return;
    } else if (rowsCol.includes(".")) {
      setError("Number of rows and columns must be whole number");
      return;
    }

    let grid = [];

    grid.push("#".repeat(+rowsCol + 2));

    for (let i = 1; i <= rowsCol; i++) {
      let line = "#";
      for (let j = 1; j <= rowsCol; j++) {
        const sum = i + j;

        if (sum % 3 === 0 && sum % 5 === 0) {
          line += "G";
        } else if (sum % 3 === 0) {
          line += "T";
        } else if (sum % 5 === 0) {
          line += "S";
        } else {
          line += ".";
        }
      }

      line += "#";
      grid.push(line);
    }

    grid.push("#".repeat(+rowsCol + 2));

    setResult(grid);
  };

  const clearData = () => {
    setRowsCol("");
    setResult([]);
    setError("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={ChristmasTree} alt="Christmas tree"></img>
          </div>
          <h1>Christmas Lights Pattern Generator</h1>
        </div>
        <div className={styles.form_row}>
          <label htmlFor="rows">Number of rows and columns</label>
          <input
            id="rows"
            type="text"
            placeholder="Number of rows and columns"
            value={rowsCol}
            onChange={(e) => {
              setRowsCol(e.target.value);
              setError("");
            }}
          />
          {error && <p className={styles.field_error}>{error}</p>}
        </div>
        <div className={styles.button_wrapper}>
          <button onClick={generateLightsPattern}>Generate</button>
          <button className={styles.clear_btn} onClick={clearData}>
            Clear
          </button>
        </div>
      </div>
      {result.length > 0 && (
        <div className={styles.result_wrapper}>
          <h2>Christmas Lights Generated Pattern:</h2>
          <pre>{result.join("\n")}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
