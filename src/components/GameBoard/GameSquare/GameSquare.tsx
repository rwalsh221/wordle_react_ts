import classes from './GameSquare.module.css';

type GameSquareType = {
  rowProps: string;
  styleProps: string;
  checkStyleProps: string;
};

const GameSquare = ({
  rowProps,
  styleProps,
  checkStyleProps,
}: GameSquareType) => {
  const style = 'gamesquare';
  console.log(classes[styleProps]);

  // console.log(rowProps);
  return (
    <div
      className={`${classes[style]} ${classes[styleProps]} ${classes[checkStyleProps]}`}
    >
      {rowProps}
    </div>
  );
};

export default GameSquare;
