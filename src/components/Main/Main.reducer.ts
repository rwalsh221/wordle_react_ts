import _ from 'lodash';
import type {
  GameStateType,
  KeyboardControllerType,
  RowType,
  GameStateX,
} from '../../types/types';

const ACTIONS = {
  gameStart: 'game-start',
  checkWin: 'check-win',
  endGame: 'end-game',
} as const;

type Actions = {
  type: (typeof ACTIONS)[keyof typeof ACTIONS];
  payload: {
    winningWord?: string;
    activeRowKey?: string;
    activeRowIndex?: number;
  };
};

const endGameHandler = (stateCopy: GameStateX, winLose: 'win' | 'lose') => {
  const gameRunning = stateCopy.gameStatus;

  gameRunning.running = false;
  gameRunning.status = winLose;
  return;
};

const checkWinHandler = (
  stateCopy: GameStateX,
  activeRowKey: string,
  activeRowIndex: number
) => {
  const activeRow = stateCopy.inputState[activeRowKey].input;
  const inputStateLength = Object.keys(stateCopy.inputState).length;
  let win = true;

  for (let i = 0; i < activeRow.length; i++) {
    if (!win) {
      break;
    }
    if (!activeRow[i].inCorrectPlace) {
      win = false;
    }
  }

  if (win) {
    return endGameHandler(stateCopy, 'win');
  }

  if (activeRowIndex === inputStateLength - 1) {
    endGameHandler(stateCopy, 'lose');
  }

  // return win;
};

const checkWordHandler = (
  stateCopy: GameStateX,
  activeRowKey: string,
  activeRowIndex: number,
  winningWord: string
) => {
  const winningWordArr = winningWord.split('');
  const activeRowInput = stateCopy.inputState[activeRowKey].input;
  const keyboardController = stateCopy.keyboardController;
  const inputStateLength = Object.keys(stateCopy.inputState).length;

  // CHECK IF USER INPUT IS IN CORRECT PLACE IN WINNING WORD
  for (let i = winningWordArr.length - 1; i >= 0; i--) {
    if (winningWordArr[i] === activeRowInput[i].userInput) {
      keyboardController.inCorrectPlace.push(winningWordArr[i]);

      activeRowInput[i].inWinningWord = false;
      activeRowInput[i].inCorrectPlace = true;
      activeRowInput.splice(i, 1);

      winningWordArr.splice(i, 1);
    } else {
      activeRowInput[i].inCorrectPlace = false;
    }

    // CHECK IF USER INPUT IS IN WINNING WORD BUT NOT CORRECT PLACE
    activeRowInput.forEach((el) => {
      if (winningWordArr.indexOf(el.userInput) !== -1) {
        el.inWinningWord = true;
        winningWordArr.splice(winningWordArr.indexOf(el.userInput), 1);
        keyboardController.inWinningWord.push(el.userInput);
      } else {
        keyboardController.notInWinningWord.push(el.userInput);
        el.inWinningWord = false;
      }
    });

    stateCopy.inputState[activeRowKey].status = 'inactive';
    if (activeRowIndex !== inputStateLength - 1) {
      stateCopy.inputState[activeRowIndex + 1].status = 'active';
    }
  }
};

const resetGameHandler = (stateCopy: GameStateX) => {
  const inputStateKeys = Object.keys(stateCopy.inputState);
  inputStateKeys.forEach((el, index) => {
    while (stateCopy.inputState[el].input.length) {
      stateCopy.inputState[el].input.pop();
    }
    if (index === 0) {
      stateCopy.inputState[el].status = 'active';
    } else {
      stateCopy.inputState[el].status = 'inactive';
    }
  });
};

const clearKeyboardHandler = (stateCopy: GameStateX) => {
  // https://stackoverflow.com/questions/69479640/typescript-error-no-index-signature-with-a-parameter-of-type-string-was-found  Array<keyof KeyboardControllerType>

  const keyboardControllerKeys = Object.keys(
    stateCopy.keyboardController
  ) as Array<keyof KeyboardControllerType>;

  keyboardControllerKeys.forEach((el) => {
    while (stateCopy.keyboardController[el].length) {
      stateCopy.keyboardController[el].pop();
    }
  });
  // setKeyboardController({ ...keyboardControllerCopy });
};

const gameRunningHandler = (stateCopy: GameStateX, winningWord: string) => {
  stateCopy.gameStatus.running = true;
  if (
    stateCopy.gameStatus.status === 'win' ||
    stateCopy.gameStatus.status === 'lose'
  ) {
    resetGameHandler(stateCopy);
    clearKeyboardHandler(stateCopy);
  }
  // PASS AS PAYLOAD
  // const winningWord = await getWinningWordHandler();
  stateCopy.winningWord = winningWord;
  // setGameRunning({ ...gameRunningStateCopy });
};

const userInputReducer = (state: GameStateX, action: Actions): GameStateX => {
  const stateCopy = _.cloneDeep(state);

  switch (action.type) {
    case ACTIONS.gameStart:
      gameRunningHandler(stateCopy, action.payload.winningWord!);
      return { ...stateCopy };
    case ACTIONS.checkWin:
      checkWordHandler(
        stateCopy,
        action.payload.activeRowKey!,
        action.payload.activeRowIndex!,
        action.payload.winningWord!
      );
      checkWinHandler(
        stateCopy,
        action.payload.activeRowKey!,
        action.payload.activeRowIndex!
      );
      return { ...stateCopy };
    default:
      return state;
  }
};

export default userInputReducer;
