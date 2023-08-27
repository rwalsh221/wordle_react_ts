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

export type inputStateType = {
  [key: string]: {
    status: GameStateStatus;
    input: UserInputType[];
  };
};

export type KeyboardControllerTypeOLD = {
  inCorrectPlace: string[];
  inWinningWord: string[];
  notInWinningWord: string[];
};

export type KeyboardControllerType = {
  inCorrectPlace: Set<string>;
  inWinningWord: Set<string>;
  notInWinningWord: Set<string>;
};

export type RowType = {
  status: GameStateStatus;
  input: UserInputType[];
};

export type GameStatusType = {
  status: 'win' | 'lose' | 'init' | 'running';
  running: boolean;
};

export type GameStateType = {
  winningWord: string;
  inputState: inputStateType;
  keyboardController: KeyboardControllerType;
  gameStatus: GameStatusType;
};

export type InputKey = {
  backSpace: 'Backspace';
  enter: 'Enter';
};
