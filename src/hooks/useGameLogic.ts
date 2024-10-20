import { useState, useCallback, useEffect } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 500;

const TETROMINOS = [
  [[1, 1, 1, 1]],
  [[2, 2], [2, 2]],
  [[0, 3, 3], [3, 3, 0]],
  [[4, 4, 0], [0, 4, 4]],
  [[5, 5, 5], [0, 5, 0]],
  [[6, 6, 6], [6, 0, 0]],
  [[7, 7, 7], [0, 0, 7]],
];

const createEmptyBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

export const useGameLogic = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<number[][]>([]);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [nextPiece, setNextPiece] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const getRandomPiece = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * TETROMINOS.length);
    return TETROMINOS[randomIndex];
  }, []);

  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(getRandomPiece());
    setNextPiece(getRandomPiece());
    setCurrentPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
    setScore(0);
    setLevel(1);
    setIsGameOver(false);
    setIsPaused(false);
    setSpeed(INITIAL_SPEED);
  }, [getRandomPiece]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const isCollision = useCallback(
    (piece: number[][], position: { x: number; y: number }) => {
      for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
          if (
            piece[y][x] !== 0 &&
            (board[y + position.y] &&
              board[y + position.y][x + position.x]) !== 0
          ) {
            return true;
          }
        }
      }
      return false;
    },
    [board]
  );

  const rotate = useCallback(() => {
    if (isPaused) return;
    const rotated = currentPiece[0].map((_, index) =>
      currentPiece.map((row) => row[index]).reverse()
    );
    if (!isCollision(rotated, currentPosition)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, currentPosition, isCollision, isPaused]);

  const moveLeft = useCallback(() => {
    if (isPaused) return;
    if (!isCollision(currentPiece, { x: currentPosition.x - 1, y: currentPosition.y })) {
      setCurrentPosition((prev) => ({ ...prev, x: prev.x - 1 }));
    }
  }, [currentPiece, currentPosition, isCollision, isPaused]);

  const moveRight = useCallback(() => {
    if (isPaused) return;
    if (!isCollision(currentPiece, { x: currentPosition.x + 1, y: currentPosition.y })) {
      setCurrentPosition((prev) => ({ ...prev, x: prev.x + 1 }));
    }
  }, [currentPiece, currentPosition, isCollision, isPaused]);

  const drop = useCallback(() => {
    if (isPaused) return;
    if (!isCollision(currentPiece, { x: currentPosition.x, y: currentPosition.y + 1 })) {
      setCurrentPosition((prev) => ({ ...prev, y: prev.y + 1 }));
    } else {
      const newBoard = board.map((row) => [...row]);
      currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newBoard[y + currentPosition.y][x + currentPosition.x] = value;
          }
        });
      });

      const completedRows = newBoard.reduce((acc, row, index) => {
        if (row.every((cell) => cell !== 0)) {
          acc.push(index);
        }
        return acc;
      }, [] as number[]);

      completedRows.forEach((rowIndex) => {
        newBoard.splice(rowIndex, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
      });

      const points = [0, 40, 100, 300, 1200][completedRows.length] * level;
      const newScore = score + points;
      const newLevel = Math.floor(newScore / 500) + 1;

      setBoard(newBoard);
      setScore(newScore);
      setLevel(newLevel);
      setSpeed(Math.max(INITIAL_SPEED - (newLevel - 1) * 50, 50));

      setCurrentPiece(nextPiece);
      setNextPiece(getRandomPiece());
      setCurrentPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });

      if (isCollision(nextPiece, { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 })) {
        setIsGameOver(true);
      }
    }
  }, [board, currentPiece, currentPosition, nextPiece, isCollision, level, score, getRandomPiece, isPaused]);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      drop();
    }, speed);

    return () => {
      clearInterval(gameLoop);
    };
  }, [isGameOver, isPaused, drop, speed]);

  const gameBoard = board.map((row) => [...row]);
  if (!isGameOver) {
    currentPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          gameBoard[y + currentPosition.y][x + currentPosition.x] = value;
        }
      });
    });
  }

  return {
    board: gameBoard,
    score,
    level,
    nextPiece,
    isGameOver,
    isPaused,
    startGame,
    moveLeft,
    moveRight,
    rotate,
    drop,
    togglePause,
  };
};