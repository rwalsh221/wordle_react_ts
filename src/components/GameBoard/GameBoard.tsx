import classes from './GameBoard.module.css';
import GameSquare from './GameSquare/GameSquare';

const GameBoard = () => {
  return (
    <div className={classes.gameboard}>
      <GameSquare />
      <GameSquare />
      <GameSquare />
      <GameSquare />
      <GameSquare />
      <GameSquare />
      <GameSquare />
      <GameSquare />
      <GameSquare />
      <GameSquare />
    </div>
  );
};

export default GameBoard;
