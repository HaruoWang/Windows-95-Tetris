import React from 'react';

interface NextPieceProps {
  piece: number[][];
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

export const NextPiece: React.FC<NextPieceProps> = ({ piece }) => {
  return (
    <div className="win95-window p-2 md:mb-4 h-fit scale-[0.8] md:scale-100">
      <div className="text-sm mb-1">Next Piece:</div>
      <div className="win95-inset p-2 flex items-center justify-center">
      <div className="w-20 h-10 grid grid-cols-4 items-center justify-items-center">
          {piece.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-4 h-4 ${colors[cell]} border border-gray-400`}
                style={{
                  gridColumnStart: piece.length == 2 && j == 0 ? '1' : 'auto',
                }}
              />
            ))
          )}
      </div>
      </div>
    </div>
  );
};