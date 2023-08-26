import _ from 'lodash';
import type {
  GameStateType,
  KeyboardControllerType,
  RowType,
  GameStateX,
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
  stateCopy: GameStateX,
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

const deleteHandler = (stateCopy: GameStateX, activeRowKey: string) => {
  stateCopy.inputState[activeRowKey].input.pop();
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
  nextRowKey: string
) => {
  // console.log(winningWord);
  const winningWordArr = stateCopy.winningWord.split('');
  const activeRowInput = [...stateCopy.inputState[activeRowKey].input];
  const keyboardController = stateCopy.keyboardController;
  const inputStateLength = Object.keys(stateCopy.inputState).length;
  console.log(activeRowInput[0]);
  console.log(winningWordArr);
  // CHECK IF USER INPUT IS IN CORRECT PLACE IN WINNING WORD
  for (let i = winningWordArr.length - 1; i >= 0; i--) {
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
    console.log(winningWordArr);
    console.log(winningWordArr[i], activeRowInput[i].userInput);
    console.log(winningWordArr.length);
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLL');

    if (winningWordArr[i] === activeRowInput[i].userInput) {
      console.log(true);
      keyboardController.inCorrectPlace.add(winningWordArr[i]);

      activeRowInput[i].inWinningWord = false;
      activeRowInput[i].inCorrectPlace = true;
      activeRowInput.splice(i, 1);

      winningWordArr.splice(i, 1);
    } else {
      activeRowInput[i].inCorrectPlace = false;
    }
    console.log(activeRowInput[0]);
  }
  // CHECK IF USER INPUT IS IN WINNING WORD BUT NOT CORRECT PLACE
  activeRowInput.forEach((el) => {
    if (winningWordArr.indexOf(el.userInput) !== -1) {
      el.inWinningWord = true;
      winningWordArr.splice(winningWordArr.indexOf(el.userInput), 1);
      keyboardController.inWinningWord.add(el.userInput);
      console.log(el);
    } else {
      console.log('ISISIS FALSE');
      console.log(el.userInput);
      keyboardController.notInWinningWord.add(el.userInput);
      el.inWinningWord = false;
    }
  });

  stateCopy.inputState[activeRowKey].status = 'inactive';
  // console.log(stateCopy.winningWord);
  if (activeRowIndex !== inputStateLength - 1) {
    stateCopy.inputState[nextRowKey].status = 'active';
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
    stateCopy.keyboardController[el].clear();
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
        action.payload.nextRowKey!
      );
      checkWinHandler(
        stateCopy,
        action.payload.activeRowKey!,
        action.payload.activeRowIndex!
      );
      console.log(stateCopy);
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
