import classes from './GameSquare.module.css';

type GameSquareType = {
  rowProps: string;
};

const GameSquare = ({ rowProps }: GameSquareType) => {
  // console.log(rowProps);
  return <div className={classes.gamesquare}>{rowProps}</div>;
};

export default GameSquare;
