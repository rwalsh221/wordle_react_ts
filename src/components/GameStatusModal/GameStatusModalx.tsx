import classes from './GameStatusModal.module.css';

type Actions = {
  type: 'game-start';
  payload: {
    winningWord: string;
  };
};

type GameStatusModalPropTypes = {
  dispatchGameRunningProps: React.Dispatch<Actions>;
  gameStatusProps: 'win' | 'lose' | 'init' | 'running';
  winningWordProps: string;
};

const GameStatusModalx = ({
  dispatchGameRunningProps,
  gameStatusProps,
  winningWordProps,
}: GameStatusModalPropTypes) => {
  const modalContentHandler = () => {
    const message = {
      init: 'HELLO!, Please press start to play the game',
      win: `CONGRATULATIONS! the correct word was ${winningWordProps.toUpperCase()}, Please press start to play again`,
      lose: 'BAD LUCK!, Please press start to play again',
    } as const;

    const style = {
      init: 'game_status_modal_no_animation',
      winLose: 'game_status_modal_animation',
    } as const;

    const content: {
      message: (typeof message)[keyof typeof message];
      style: (typeof style)[keyof typeof style];
    } = {
      message: message.init,
      style: style.init,
    };

    if (gameStatusProps === 'win') {
      content.message = message.win;
      content.style = style.winLose;
    }
    if (gameStatusProps === 'lose') {
      content.message = message.lose;
      content.style = style.winLose;
    }
    return content;
  };

  const content = modalContentHandler();

  const setGameRunningHandler = async () => {
    try {
      const getWinningWord = await fetch('./src/json/words.json');
      if (!getWinningWord.ok) {
        throw new Error();
      }
      const winningWordArr: string[] = (await getWinningWord.json()) as [];

      const winningWord =
        winningWordArr[Math.floor(Math.random() * winningWordArr.length)];
      dispatchGameRunningProps({
        type: 'game-start',
        payload: {
          winningWord: winningWord,
        },
      });
    } catch (error) {
      console.error(error);
    }

    // dispatch winningword as payload
  };

  return (
    <div className={`${classes.game_status_modal} ${classes[content.style]}`}>
      <p>{content.message}</p>
      <button
        type="button"
        onClick={setGameRunningHandler}
        aria-label="start game"
      >
        START
      </button>
    </div>
  );
};

export default GameStatusModalx;
