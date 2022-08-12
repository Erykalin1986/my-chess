import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selctedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell:Cell) {
    if (selctedCell && selctedCell !== cell && selctedCell.figure?.canMove(cell)) {
      selctedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      updateBoard();
    }
    else {
      if (cell.figure?.color === currentPlayer?.color) setSelectedCell(cell);
    }
  }

  useEffect(() => {
    hightlightCells()
  }, [selctedCell]);

  function hightlightCells() {
    board.hightlightCells(selctedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }
  
  return (
    <div>
      <h3>Текущий игрок: { currentPlayer?.color }</h3>

      <div className="board">
        {board.cells.map((row: Cell[], index: number) => 
          <React.Fragment key={index}>
            {row.map(cell => 
              <CellComponent 
              click={click}
              cell={cell}
              key={cell.id}
              selected={cell.x === selctedCell?.x && cell.y === selctedCell?.y}
              />
            )}
          </React.Fragment>
        )}
      </div>
     </div>
  );
};

export default BoardComponent;
