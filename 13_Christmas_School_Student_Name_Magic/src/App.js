import { useState } from "react";
import styles from "./App.module.css";
import Female from "./Assets/Images/female.png";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [students, setStudents] = useState([]);
  const [girls, setGirls] = useState([]);
  const [errors, setErrors] = useState({});

  const insertStudent = () => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const isDuplicate = students.some(
      (student) =>
        student.firstName.toLowerCase() === firstName.toLowerCase() &&
        student.lastName.toLowerCase() === lastName.toLowerCase()
    );

    if (isDuplicate) {
      newErrors.duplicate = "This student is already entered";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const student = {
      firstName: firstName,
      lastName: lastName,
    };

    setStudents((prev) => [...prev, student]);

    setFirstName("");
    setLastName("");
  };

  const findGirls = () => {
    const girlsList = students.filter(
      (student) => !student.firstName.endsWith("s")
    );
    setGirls(girlsList);
  };

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setStudents([]);
    setGirls([]);
    setErrors({});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div className={styles.img_con}>
            <img src={Female} alt="Female"></img>
          </div>
          <h1>Christmas School – Student Name Magic</h1>
        </div>
        <div className={styles.form_row}>
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setErrors((prev) => {
                const { lastName, duplicate, ...res } = prev;
                return res;
              });
            }}
          />
          {errors.lastName && (
            <p className={styles.field_error}>{errors.lastName}</p>
          )}
        </div>
        <div className={styles.form_row}>
          <label htmlFor="name">First name</label>
          <input
            id="name"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((prev) => {
                const { firstName, duplicate, ...res } = prev;
                return res;
              });
            }}
          />
          {errors.firstName && (
            <p className={styles.field_error}>{errors.firstName}</p>
          )}
        </div>
        <div className={styles.button_wrapper}>
          <button className={styles.insert_btn} onClick={insertStudent}>
            Insert student
          </button>
          <button className={styles.clear_btn} onClick={clearData}>
            Clear
          </button>
        </div>
        {errors.duplicate && (
          <p className={styles.field_error}>{errors.duplicate}</p>
        )}
      </div>
      {students.length > 0 && (
        <div className={styles.students_wrapper}>
          <button onClick={findGirls} className={styles.filter_btn}>
            Filter students
          </button>
          <h2>Students List</h2>
          {students.map((student, index) => {
            return (
              <div key={index} className={styles.student_data}>
                <span>{student.lastName}</span>
                <span>{student.firstName}</span>
              </div>
            );
          })}
          {girls.length > 0 && (
            <div className={styles.girls_list}>
              <h2>Girls List</h2>
              {girls.length}
              {girls.map((girls, index) => {
                return (
                  <div key={index} className={styles.girl_data}>
                    <span>{girls.lastName}</span>
                    <span>{girls.firstName}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
