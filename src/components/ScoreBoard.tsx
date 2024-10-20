import React from 'react';

interface ScoreBoardProps {
  score: number;
  level: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level }) => {
  return (
    <div className="win95-window p-2 scale-[0.8] md:scale-100">
      <div className="mb-2">
        <div className="text-sm mb-1">Score:</div>
        <div className="win95-inset p-1 text-right">{score}</div>
      </div>
      <div>
        <div className="text-sm mb-1">Level:</div>
        <div className="win95-inset p-1 text-right">{level}</div>
      </div>
    </div>
  );
};