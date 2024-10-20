import React from 'react';
import { RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface BasicControlsProps {
  gameLogic: {
    moveLeft: () => void;
    moveRight: () => void;
    rotate: () => void;
    drop: () => void;
    isGameOver: boolean;
    isPaused: boolean;
  };
}

export const BasicControls: React.FC<BasicControlsProps> = ({ gameLogic }) => {
  const {
    moveLeft,
    moveRight,
    rotate,
    drop,
    isGameOver,
    isPaused
  } = gameLogic;

  const handleMove = (action: () => void) => {
    if (!isGameOver && !isPaused) {
      action();
    }
  };

  return (
    <>
    <div className="win95-window p-2 lg:mb-4 h-fit scale-[0.8] lg:scale-100 hidden lg:block">
        <div className="text-sm mb-1">Controls:</div>
        <div className="win95-inset p-1 text-right">▲ Rotate<br />▼ Move Down<br />◀ Move Left<br />▶ Move Right</div>
    </div>
    <div className="text-right flex flex-wrap justify-center justify-self-center lg:hidden w-4/5">
      <button className="controls-button justify-self-center m-1" onClick={() => handleMove(moveLeft)}><ArrowLeft /></button>
      <button className="controls-button justify-self-center m-1" onClick={() => handleMove(moveRight)}><ArrowRight /></button>
      <button className="controls-button justify-self-center m-1" onClick={() => handleMove(drop)}><ArrowDown /></button>
      <button className="controls-button justify-self-center m-1" onClick={() => handleMove(rotate)}><RotateCw /></button>
    </div>
    </>
  );
};