import _ from 'lodash';
import type {
  KeyboardControllerType,
  GameStateType,
  InputKey,
} from '../../types/types';

const INPUT_KEY: InputKey = {
  backSpace: 'Backspace',
  enter: 'Enter',
};

const ACTIONS = {
  gameStart: 'game-start',
  checkWin: 'check-win',
  endGame: 'end-game',
  deleteInput: 'delete-input',
  addInput: 'add-input',
} as const;

type Actions = {
  type: (typeof ACTIONS)[keyof typeof ACTIONS];
  payload: {
    winningWord?: string;
    activeRowKey?: string;
    activeRowIndex?: number;
    keyPressed?: string;
    nextRowKey?: string;
  };
};

const pushInputHandler = (
  stateCopy: GameStateType,
  keyPressed: string | null,
  inputKey: InputKey,
  activeRowKey: string
) => {
  const activeRow = stateCopy.inputState[activeRowKey].input;

  if (keyPressed === null || activeRow.length >= 5) {
    return false;
  }
  if (keyPressed === inputKey.backSpace || keyPressed === inputKey.enter) {
    return false;
  }

  activeRow.push({
    userInput: keyPressed,
    inWinningWord: null,
    inCorrectPlace: null,
  });
  return true;
};

const deleteHandler = (stateCopy: GameStateType, activeRowKey: string) => {
  stateCopy.inputState[activeRowKey].input.pop();
};

const endGameHandler = (stateCopy: GameStateType, winLose: 'win' | 'lose') => {
  const gameRunning = stateCopy.gameStatus;

  gameRunning.running = false;
  gameRunning.status = winLose;
  return;
};

const checkWinHandler = (
  stateCopy: GameStateType,
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
};

const checkWordHandler = (
  stateCopy: GameStateType,
  activeRowKey: string,
  activeRowIndex: number,
  nextRowKey: string
) => {
  const winningWordArr = stateCopy.winningWord.split('');
  const activeRowInput = [...stateCopy.inputState[activeRowKey].input];
  const keyboardController = stateCopy.keyboardController;
  const inputStateLength = Object.keys(stateCopy.inputState).length;

  // CHECK IF USER INPUT IS IN CORRECT PLACE IN WINNING WORD
  for (let i = winningWordArr.length - 1; i >= 0; i--) {
    if (winningWordArr[i] === activeRowInput[i].userInput) {
      keyboardController.inCorrectPlace.add(winningWordArr[i]);

      activeRowInput[i].inWinningWord = false;
      activeRowInput[i].inCorrectPlace = true;
      activeRowInput.splice(i, 1);

      winningWordArr.splice(i, 1);
    } else {
      activeRowInput[i].inCorrectPlace = false;
    }
  }
  // CHECK IF USER INPUT IS IN WINNING WORD BUT NOT CORRECT PLACE
  activeRowInput.forEach((el) => {
    if (winningWordArr.indexOf(el.userInput) !== -1) {
      el.inWinningWord = true;
      winningWordArr.splice(winningWordArr.indexOf(el.userInput), 1);
      keyboardController.inWinningWord.add(el.userInput);
    } else {
      keyboardController.notInWinningWord.add(el.userInput);
      el.inWinningWord = false;
    }
  });

  stateCopy.inputState[activeRowKey].status = 'inactive';

  if (activeRowIndex !== inputStateLength - 1) {
    stateCopy.inputState[nextRowKey].status = 'active';
  }
};

const resetGameHandler = (stateCopy: GameStateType) => {
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

const clearKeyboardHandler = (stateCopy: GameStateType) => {
  // https://stackoverflow.com/questions/69479640/typescript-error-no-index-signature-with-a-parameter-of-type-string-was-found  Array<keyof KeyboardControllerType>

  const keyboardControllerKeys = Object.keys(
    stateCopy.keyboardController
  ) as Array<keyof KeyboardControllerType>;

  keyboardControllerKeys.forEach((el) => {
    stateCopy.keyboardController[el].clear();
  });
};

const gameRunningHandler = (stateCopy: GameStateType, winningWord: string) => {
  stateCopy.gameStatus.running = true;
  if (
    stateCopy.gameStatus.status === 'win' ||
    stateCopy.gameStatus.status === 'lose'
  ) {
    resetGameHandler(stateCopy);
    clearKeyboardHandler(stateCopy);
  }

  stateCopy.winningWord = winningWord;
};

const userInputReducer = (
  state: GameStateType,
  action: Actions
): GameStateType => {
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
        action.payload.nextRowKey!
      );
      checkWinHandler(
        stateCopy,
        action.payload.activeRowKey!,
        action.payload.activeRowIndex!
      );

      return { ...stateCopy };
    case ACTIONS.deleteInput:
      deleteHandler(stateCopy, action.payload.activeRowKey!);
      return { ...stateCopy };
    case ACTIONS.addInput:
      if (
        pushInputHandler(
          stateCopy,
          action.payload.keyPressed!,
          INPUT_KEY,
          action.payload.activeRowKey!
        )
      ) {
        return { ...stateCopy };
      }
      return state;
    default:
      return state;
  }
};

export default userInputReducer;
