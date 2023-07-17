import classes from './GameBoard.module.css';
import GameSquare from './GameSquare/GameSquare';

// type GameBoardType = {
//   userInputProps: string[][];
// };

type GameBoardPropTypes = {
  userInputProps: {
    [key: string]: {
      active: boolean;
      input: string[];
      inWinningWord: string[];
      inCorrectPlace: string[];
    };
  };
};

const GameBoard = ({ userInputProps }: GameBoardPropTypes) => {
  // const renderGameSquare = () => {
  //   const gameSquares = [];
  //   for (let i = 0; i < 6; i++) {
  //     for (let j = 0; j < 5; j++) {
  //       if (userInputProps[i]?.[j]) {
  //         gameSquares.push(<GameSquare rowProps={userInputProps[i][j]} />);
  //       } else {
  //         gameSquares.push(<GameSquare rowProps={'*'} />);
  //       }
  //     }
  //   }
  //   return gameSquares;
  // };
  // return <div className={classes.gameboard}>{renderGameSquare()}</div>;

  const renderGameSquare = () => {
    const gameSquares = [];
    const userInputPropsKeys = Object.keys(userInputProps);

    userInputPropsKeys.forEach((key) => {
      for (let i = 0; i < 5; i++) {
        if (userInputProps[key].input[i]) {
          gameSquares.push(
            <GameSquare rowProps={userInputProps[key].input[i]} />
          );
        } else {
          console.log(';else');
          gameSquares.push(<GameSquare rowProps={'*'} />);
        }
      }
    });
    return gameSquares;
  };

  return <div className={classes.gameboard}>{renderGameSquare()}</div>;
};

export default GameBoard;
