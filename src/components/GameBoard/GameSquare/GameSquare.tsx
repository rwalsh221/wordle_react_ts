import classes from './GameSquare.module.css';

type GameSquareType = {
  rowProps: string;
  styleProps: string;
};

const GameSquare = ({ rowProps, styleProps }: GameSquareType) => (
  <div className={`${classes['gamesquare']} ${classes[styleProps]}`}>
    {rowProps}
  </div>
);

export default GameSquare;
