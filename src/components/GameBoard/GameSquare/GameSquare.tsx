import classes from './GameSquare.module.css';

type GameSquareType = {
  rowProps: string;
  styleProps: string;
};

const GameSquare = ({ rowProps, styleProps }: GameSquareType) => {
  const style = 'gamesquare';

  // console.log(rowProps);
  return (
    <div className={`${classes[style]} ${classes[styleProps]}`}>{rowProps}</div>
  );
};

export default GameSquare;
