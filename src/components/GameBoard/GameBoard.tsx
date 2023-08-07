import React from 'react';
import classes from './GameBoard.module.css';
import GameSquare from './GameSquare/GameSquare';

import { GameStateType } from '../../types/types';

// type GameBoardType = {
//   userInputProps: string[][];
// };

type GameBoardPropTypes = {
  gameStateProps: GameStateType;
  winningWordProps: string;
};

const GameBoard = ({
  gameStateProps,
  winningWordProps,
}: GameBoardPropTypes) => {
  const renderGameSquare = () => {
    const gameSquares: React.ReactElement[] = [];
    const userInputPropsKeys = Object.keys(gameStateProps);

    // ADD NOT IN WORD KEY TO OBJ
    // FOR COMPLETE STATUS
    const gameSquareStyleHandler = (inputObj) => {
      let style: string;
      switch (true) {
        case inputObj.inWinningWord:
          style = 'blue';
          console.log(style);
          break;
        case inputObj.inCorrectPlace:
          style = 'green';
          break;
        case !inputObj.inCorrectPlace && !inputObj.inWinningword:
          style = 'red';
          break;
        default:
          style = 'init';
      }

      return style;
    };

    userInputPropsKeys.forEach((key) => {
      const copyGuess = [...gameStateProps[key].input];
      const winningWordArr = winningWordProps.split('');

      for (let i = 0; i < 5; i++) {
        if (
          gameStateProps[key].input[i] &&
          gameStateProps[key].status === 'active'
        ) {
          gameSquares.push(
            <GameSquare
              key={`${key}${i}`}
              rowProps={gameStateProps[key].input[i].input}
              styleProps="init"
              // checkStyleProps="gamesquare_check_win"
            />
          );
        } else if (gameStateProps[key].input[i]) {
          // compare guess to win

          gameSquares.push(
            <GameSquare
              key={`${key}${i}`}
              rowProps={gameStateProps[key].input[i].input}
              styleProps={gameSquareStyleHandler(gameStateProps[key].input[i])}
            />
          );
        } else {
          gameSquares.push(
            <GameSquare key={`${key}${i}`} rowProps={'?'} styleProps="init" />
          );
        }
      }
    });
    return gameSquares;
  };

  return <div className={classes.gameboard}>{renderGameSquare()}</div>;
};

export default GameBoard;
