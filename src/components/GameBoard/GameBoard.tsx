import React from 'react';
import classes from './GameBoard.module.css';
import GameSquare from './GameSquare/GameSquare';

import { GameStateType, UserInputType } from '../../types/types';

type GameBoardPropTypes = {
  gameStateProps: GameStateType;
  winningWordProps: string;
};

const GameBoard = ({ gameStateProps }: GameBoardPropTypes) => {
  const renderGameSquare = () => {
    const gameSquares: React.ReactElement[] = [];
    const userInputPropsKeys = Object.keys(gameStateProps);

    const gameSquareStyleHandler = (inputObj: UserInputType) => {
      let style: string;
      switch (true) {
        case inputObj.inWinningWord:
          style = 'input__in_word';
          break;
        case inputObj.inCorrectPlace:
          style = 'input__in_correct_place';
          break;
        case !inputObj.inCorrectPlace && !inputObj.inWinningWord:
          style = 'input__not_in_word';
          break;
        default:
          style = 'input__init';
      }

      return style;
    };

    userInputPropsKeys.forEach((key) => {
      for (let i = 0; i < 5; i++) {
        if (
          gameStateProps[key].input[i] &&
          gameStateProps[key].status === 'active'
        ) {
          gameSquares.push(
            <GameSquare
              key={`${key}${i}`}
              rowProps={gameStateProps[key].input[i].input}
              styleProps="input__init"
            />
          );
        } else if (gameStateProps[key].input[i]) {
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
