import classes from './GameBoard.module.css';
import GameSquare from './GameSquare/GameSquare';

type GameBoardType = {
  userInputProps: string[][];
};

const GameBoard = ({ userInputProps }: GameBoardType) => {
  const renderGameSquare = () => {
    const gameSquares = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        if (userInputProps[i]?.[j]) {
          gameSquares.push(<GameSquare rowProps={userInputProps[i][j]} />);
        } else {
          gameSquares.push(<GameSquare rowProps={'*'} />);
        }
      }
    }
    return gameSquares;
  };
  return <div className={classes.gameboard}>{renderGameSquare()}</div>;
};

export default GameBoard;
