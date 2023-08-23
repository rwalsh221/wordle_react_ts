export type GameStateStatus =
  | 'active'
  | 'inactive'
  | 'checkingWin'
  | 'complete';

// export type Test = boolean;

export type UserInputType = {
  userInput: string;
  inWinningWord: boolean | null;
  inCorrectPlace: boolean | null;
};

export type GameStateType = {
  [key: string]: {
    status: GameStateStatus;
    input: UserInputType[];
  };
};

export type KeyboardControllerType = {
  inCorrectPlace: string[];
  inWinningWord: string[];
  notInWinningWord: string[];
};

export type RowType = {
  status: GameStateStatus;
  input: UserInputType[];
};

export type GameRunningType = {
  status: 'win' | 'lose' | 'init' | 'running';
  running: boolean;
};

export type GameStateX = {
  winningWord: string;
  inputState: GameStateType;
  keyboardController: KeyboardControllerType;
  gameStatus: GameRunningType;
};

export type InputKey = {
  backSpace: 'Backspace';
  enter: 'Enter';
};
