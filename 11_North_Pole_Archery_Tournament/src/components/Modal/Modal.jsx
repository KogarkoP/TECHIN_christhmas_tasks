import styles from "./Modal.module.css";

const Modal = ({ message, player, setShowModal }) => {
  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.modal}>
        <div className={styles.close_btn_wrapper}>
          <button
            className={styles.close_btn}
            onClick={() => setShowModal(false)}
          >
            ×
          </button>
        </div>
        <p>{message}</p>
        {player.name && (
          <>
            <p className={styles.name}>{player.name}</p>
            <p>Score: {player.score}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
