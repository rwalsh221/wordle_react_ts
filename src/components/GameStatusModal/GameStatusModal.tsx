import classes from './GameStatusModal.module.css';

type GameStatusModalPropTypes = {
  setGameRunningProps: () => Promise<void>;
  gameStatusProps: 'win' | 'lose' | 'init' | 'running';
  winningWordProps: string;
};

const GameStatusModal = ({
  setGameRunningProps,
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

  return (
    <div className={`${classes.game_status_modal} ${classes[content.style]}`}>
      <p>{modalContentHandler().message}</p>
      <button type="button" onClick={setGameRunningProps}>
        START
      </button>
    </div>
  );
};

export default GameStatusModal;
