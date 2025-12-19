import { useState } from "react";
import styles from "./App.module.css";
import SantasClock from "./Assets/Images/santa-claus-clock.png";

const App = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [flightDuration, setFlightDuration] = useState("");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const calculateLandingTime = () => {
    const newErrors = {};

    if (!hours.trim()) {
      newErrors.hours = "Hours is required field";
    } else if (isNaN(hours)) {
      newErrors.hours = "Hours must be a number";
    } else if (hours.includes(".")) {
      newErrors.hours = "Hours must be whole number";
    } else if (hours > 23 || hours < 0) {
      newErrors.hours = "Please enter a valid hour (0 – 23)";
    }

    if (!minutes.trim()) {
      newErrors.minutes = "Minutes is required field";
    } else if (isNaN(minutes)) {
      newErrors.minutes = "Minutes must be a number";
    } else if (minutes.includes(".")) {
      newErrors.minutes = "Minutes must be whole number";
    } else if (minutes > 59 || minutes < 0) {
      newErrors.minutes = "Please enter a valid minute (0 – 59)";
    }

    if (!flightDuration.trim()) {
      newErrors.flightDuration = "Trip duration is required field";
    } else if (isNaN(flightDuration)) {
      newErrors.flightDuration = "Trip duration must be a number";
    } else if (flightDuration.includes(".")) {
      newErrors.flightDuration = "Trip duration must be whole number";
    } else if (flightDuration < 0) {
      newErrors.flightDuration = "Please enter a valid trip duration (0 - ∞)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const launchDate = new Date();
    launchDate.setHours(hours, minutes);

    const flightDurationInMs = flightDuration * 60 * 1000;

    launchDate.setTime(launchDate.getTime() + flightDurationInMs);

    setResult(launchDate);
  };

  const clearAll = () => {
    setHours("");
    setMinutes("");
    setFlightDuration("");
    setErrors({});
    setResult("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={SantasClock} alt="Clock"></img>
          </div>
          <h1>Santa’s Sleigh Flight Schedule</h1>
        </div>
        <h2>Flight Start Time (24H)</h2>
        <div className={styles.flight_start_data}>
          <div className={styles.form_row}>
            <label htmlFor="hoursFrom">Hours</label>
            <input
              id="hoursFrom"
              type="text"
              placeholder="Hours"
              value={hours}
              onChange={(e) => {
                setHours(e.target.value);
                setErrors((prev) => {
                  const { hours, ...res } = prev;
                  return res;
                });
              }}
            />
            {errors.hours && (
              <p className={styles.field_error}>{errors.hours}</p>
            )}
          </div>
          <div className={styles.form_row}>
            <label htmlFor="minutesFrom">Minutes</label>
            <input
              id="minutesFrom"
              type="text"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => {
                setMinutes(e.target.value);
                setErrors((prev) => {
                  const { minutes, ...res } = prev;
                  return res;
                });
              }}
            />
            {errors.minutes && (
              <p className={styles.field_error}>{errors.minutes}</p>
            )}
          </div>
        </div>
        <div className={styles.flight_duration}>
          <div className={styles.form_row}>
            <label htmlFor="minutesDuration">Trip duration in minutes</label>
            <input
              id="minutesDuration"
              type="text"
              placeholder="Minutes"
              value={flightDuration}
              onChange={(e) => {
                setFlightDuration(e.target.value);
                setErrors((prev) => {
                  const { flightDuration, ...res } = prev;
                  return res;
                });
              }}
            />
            {errors.flightDuration && (
              <p className={styles.field_error}>{errors.flightDuration}</p>
            )}
          </div>
        </div>
        <button className={styles.calculate_btn} onClick={calculateLandingTime}>
          Calculate
        </button>
        <button className={styles.clear_btn} onClick={clearAll}>
          Clear
        </button>
        {result && (
          <div className={styles.landing_data}>
            <h2>Landing date</h2>
            <p>
              {" "}
              {result.toLocaleString([], {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
