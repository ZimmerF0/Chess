import React, { useRef, useState, useEffect } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: React.FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1);
  }
  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1);
  }

  function handlerRestart() {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  return (
    <div>
      <div>
        <button onClick={handlerRestart}>Restart game</button>
      </div>
      <h2>Черные - {blackTime} сек</h2>
      <h2>Белые - {whiteTime} сек</h2>
    </div>
  );
};

export default Timer;
