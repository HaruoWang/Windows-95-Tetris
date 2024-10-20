import React from 'react';

interface TetrisBoardProps {
  board: number[][];
}

const colors = [
  'bg-gray-200',
  'bg-[#F3632E]',
  'bg-[#66C557]',
  'bg-[#3D87CF]',
  'bg-[#FAC705]',
  'bg-[#1E3A8A]',
  'bg-[#0D9488]',
  'bg-[#1f2937]',
];

export const TetrisBoard: React.FC<TetrisBoardProps> = ({ board }) => {
  return (
    <div className="win95-inset p-2 m-2 md:m-0">
      <div className="grid grid-cols-10 gap-px">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-4 h-4 md:w-6 md:h-6 ${colors[cell]} border border-gray-400`}
            />
          ))
        )}
      </div>
    </div>
  );
};