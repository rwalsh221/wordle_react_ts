import React from 'react';
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
  winningWordProps: string;
};

const GameBoard = ({
  userInputProps,
  winningWordProps,
}: GameBoardPropTypes) => {
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
    const gameSquares: React.ReactElement[] = [];
    const userInputPropsKeys = Object.keys(userInputProps);

    // ADD NOT IN WORD KEY TO OBJ
    const gameSquareStyleHandler = (inputObj) => {
      console.log('stlye', inputObj);
      let style: string;
      switch (true) {
        case inputObj.inWinningWord:
          style = 'blue';
          console.log(style);
          break;
        case inputObj.inCorrectPlace:
          style = 'green';
          break;
        case inputObj.inCorrectPlace === false &&
          inputObj.inWinngingword === false:
          style = 'red';
          break;
        default:
          style = 'init';
      }
      console.log(style);
      return style;
    };

    userInputPropsKeys.forEach((key) => {
      const copyGuess = [...userInputProps[key].input];
      const winningWordArr = winningWordProps.split('');

      for (let i = 0; i < 5; i++) {
        if (userInputProps[key].input[i]) {
          // compare guess to win

          gameSquares.push(
            <GameSquare
              key={`${key}${i}`}
              rowProps={userInputProps[key].input[i].input}
              styleProps={gameSquareStyleHandler(userInputProps[key].input[i])}
            />
          );
        } else {
          gameSquares.push(
            <GameSquare key={`${key}${i}`} rowProps={'*'} styleProps="init" />
          );
        }
      }
    });
    return gameSquares;
  };

  return <div className={classes.gameboard}>{renderGameSquare()}</div>;
};

export default GameBoard;
