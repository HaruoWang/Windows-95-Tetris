import React, { useEffect, useCallback } from 'react';
import { TetrisBoard } from './components/TetrisBoard';
import { NextPiece } from './components/NextPiece';
import { ScoreBoard } from './components/ScoreBoard';
import { BasicControls } from './components/BasicControls';
import { useGameLogic } from './hooks/useGameLogic';
import { Box, Play, Pause } from 'lucide-react';

function App() {
  const gameLogic = useGameLogic();
  const {
    board,
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
  } = gameLogic;

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (isGameOver || isPaused) return;
      switch (event.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowUp':
          rotate();
          break;
        case 'ArrowDown':
          drop();
          break;
      }
    },
    [isGameOver, isPaused, moveLeft, moveRight, rotate, drop]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-teal-600 flex items-center justify-center p-4">
      <div className="win95-window p-4 max-w-4xl w-full">
        <div className="bg-blue-900 text-white p-1 mb-2 flex items-center">
          <Box size={16} className="mr-2" />
          <span>Windows 95 Tetris</span>
        </div>
        <div className="flex flex-wrap justify-center md:gap-4">
          <TetrisBoard board={board} />
          <div className='grid grid-cols-2 items-center md:block scale-[0.9] md:scale-100 relative bottom-4 md:bottom-0'>
            <NextPiece piece={nextPiece} />
            <BasicControls gameLogic={gameLogic}/>
            <ScoreBoard score={score} level={level} />
            <button
              className=
              {isGameOver ? 
                "win95-button md:mt-4 flex items-center justify-center justify-self-center w-4/5 md:w-full h-fit animate-[wiggle_1s_ease-in-out_infinite]" : 
                "win95-button md:mt-4 flex items-center justify-center justify-self-center w-4/5 md:w-full h-fit"}
              onClick={isGameOver ? startGame : togglePause}
            >
              {isGameOver ? (
                'Start'
              ) : (
                <>
                  {isPaused ? <Play /> : <Pause />}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;