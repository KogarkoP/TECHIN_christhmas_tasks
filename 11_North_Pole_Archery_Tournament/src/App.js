import { useState, useEffect } from "react";
import styles from "./App.module.css";
import HeadingTarget from "./Assets/Images/Heading_Target.png";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [player, setPlayer] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [players, setPlayers] = useState([]);
  const [insertError, setInsertError] = useState("");
  const [shots, setShots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState("");
  const messages = {
    nexPlayerTurn:
      "Turn complete! It’s now the next player’s turn. Or click the Calculate Results button to see who won.",
    winnerMessage: "And the winner is",
  };
  const CENTER = 175;
  const radius1 = 125;
  const radius2 = 75;
  const radius3 = 50;
  const bullRadius = 25;
  const EPSILON = 0.5;

  const insertPlayer = () => {
    if (!player.trim()) {
      setInsertError("Player Name is required field");
      return;
    }

    if (players.find((p) => p.name.toLowerCase() === player.toLowerCase())) {
      setInsertError("Player Name already exists");
      return;
    }

    const playerData = {
      name: player,
      isPlaying: true,
      score: 0,
      shotCount: 0,
    };

    setCurrentPlayer(playerData);

    setPlayers((prev) => [...prev, playerData]);
    setPlayer("");
  };

  const shoot = () => {
    const angle = Math.random() * 2 * Math.PI;

    const maxRadius = CENTER;
    const r = Math.sqrt(Math.random()) * maxRadius;

    const x = CENTER + r * Math.cos(angle);
    const y = CENTER + r * Math.sin(angle);

    const dx = x - CENTER;
    const dy = y - CENTER;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const isOnBoundary = (distance, radius) =>
      Math.abs(distance - radius) <= EPSILON;

    let scoreIncrement = 1;

    if (isOnBoundary(distance, bullRadius)) {
      scoreIncrement = 10 / 2;
    } else if (distance < bullRadius) {
      scoreIncrement = 10;
    } else if (isOnBoundary(distance, radius3)) {
      scoreIncrement = 7 / 2;
    } else if (distance < radius3) {
      scoreIncrement = 7;
    } else if (isOnBoundary(distance, radius2)) {
      scoreIncrement = 5 / 2;
    } else if (distance < radius2) {
      scoreIncrement = 5;
    } else if (isOnBoundary(distance, radius1)) {
      scoreIncrement = 3 / 2;
    } else if (distance < radius1) {
      scoreIncrement = 3;
    }

    setCurrentPlayer((prev) => {
      const updatedPlayer = {
        ...prev,
        score: prev.score + scoreIncrement,
        shotCount: prev.shotCount + 1,
      };

      setPlayers((players) =>
        players.map((p) => (p.name === prev.name ? updatedPlayer : p))
      );

      return updatedPlayer;
    });

    const shot = { x: x, y: y };
    setShots((prev) => [...prev, shot]);
  };

  const calculateResults = () => {
    const winner = players.reduce((max, player) =>
      player.score > max.score ? player : max
    );

    setWinner(winner);
    setMessage(messages.winnerMessage);
    setShowModal(true);
  };

  const restartGame = () => {
    setPlayer("");
    setCurrentPlayer({});
    setPlayers([]);
    setInsertError("");
    setShots([]);
    setWinner("");
    setMessage("");
    setShowModal(false);
  };

  useEffect(() => {
    if (currentPlayer.shotCount === 5) {
      setShowModal(true);
      setMessage(messages.nexPlayerTurn);
      setTimeout(() => {
        setCurrentPlayer({});
        setShots([]);
      }, 3000);
    }
  }, [currentPlayer.shotCount]);

  return (
    <>
      {showModal && (
        <Modal message={message} player={winner} setShowModal={setShowModal} />
      )}
      <div className={styles.wrapper}>
        {players.length > 0 && (
          <div className={styles.players_scores}>
            <h2>Players Scores</h2>
            {players.map((p, index) => {
              return (
                <div key={index} className={styles.played_player_data}>
                  <p>Name: {p.name}</p>
                  <p>Score: {p.score}</p>
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.content_wrapper}>
          <div className={styles.header}>
            <div className={styles.img_con}>
              <img src={HeadingTarget} alt="Target"></img>
            </div>
            <h1>Santa’s Magical Archery Challenge</h1>
          </div>
          <div className={styles.form_row}>
            <label htmlFor="name">Player Name</label>
            <input
              id="name"
              type="text"
              placeholder="Player Name"
              value={player}
              onChange={(e) => {
                setPlayer(e.target.value);
                setInsertError("");
              }}
            />
            {insertError && <p className={styles.field_error}>{insertError}</p>}
            <button
              className={styles.insert_btn}
              onClick={insertPlayer}
              disabled={currentPlayer.isPlaying || winner}
            >
              Insert Player
            </button>
            <button className={styles.restart_btn} onClick={restartGame}>
              Restart the Game
            </button>
          </div>
        </div>
        <div className={styles.btn_wrapper}>
          <button
            className={styles.shoot_btn}
            onClick={shoot}
            disabled={
              !currentPlayer.isPlaying ||
              currentPlayer.shotCount === 5 ||
              winner
            }
          >
            Shoot
          </button>
          <button
            className={styles.calculate_btn}
            onClick={calculateResults}
            disabled={players.length <= 0 || winner}
          >
            Calculate Results
          </button>
        </div>
        {currentPlayer.name && (
          <div className={styles.result_wrapper}>
            <h2>Player {currentPlayer.name} results</h2>
            <div className={styles.melon_data}>
              <span>Score: {currentPlayer.score}</span>
              <span>Shot: {currentPlayer.shotCount}</span>
            </div>
          </div>
        )}
        <div className={styles.target_wrapper}>
          <div className={styles.first_circle}>
            <div className={styles.second_circle}>
              <div className={styles.third_circle}>
                <div className={styles.center}></div>
              </div>
            </div>
          </div>
          {shots.length > 0 &&
            shots.map((shot, index) => {
              return (
                <div
                  key={index}
                  className={styles.shot}
                  style={{ left: shot.x, top: shot.y }}
                ></div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default App;
