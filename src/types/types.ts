export type GameStateStatus =
  | 'active'
  | 'inactive'
  | 'checkingWin'
  | 'complete';

// export type Test = boolean;

export type UserInputType = {
  input: string;
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
