import type {
  GameStatusType,
  GameStateType,
  KeyboardControllerType,
  inputStateType,
} from '../../types/types';

class GameState implements GameStateType {
  public winningWord: string;
  public inputState: inputStateType;
  public keyboardController: KeyboardControllerType;
  public gameStatus: GameStatusType;

  constructor() {
    this.winningWord = '';
    this.inputState = {
      row1: {
        status: 'active',
        input: [],
      },
      row2: {
        status: 'inactive',
        input: [],
      },
      row3: {
        status: 'inactive',
        input: [],
      },
      row4: {
        status: 'inactive',
        input: [],
      },
      row5: {
        status: 'inactive',
        input: [],
      },
      row6: {
        status: 'inactive',
        input: [],
      },
    };
    this.keyboardController = {
      inCorrectPlace: new Set(),
      inWinningWord: new Set(),
      notInWinningWord: new Set(),
    };
    this.gameStatus = {
      status: 'init',
      running: false,
    };
  }
}

export default GameState;
