import classes from './GameStatusModal.module.css';

type GameStatusModalPropTypes = {
  setGameRunningProps: () => Promise<boolean>;
  gameStatusProps: 'win' | 'lose' | 'init' | 'running';
  winningWordProps: string;
};

const GameStatusModal = ({
  setGameRunningProps,
  gameStatusProps,
  winningWordProps,
}: GameStatusModalPropTypes) => {
  const modalContentHandler = () => {
    let content = 'HELLO!, Please press start to play the game';
    if (gameStatusProps === 'win') {
      content = `CONGRATULATIONS! the correct word was ${winningWordProps.toUpperCase()}, Please press start to play again`;
    }
    if (gameStatusProps === 'lose') {
      content = 'BAD LUCK!, Please press start to play again';
    }
    return content;
  };

  return (
    <div className={classes.game_status_modal}>
      <p>{modalContentHandler()}</p>
      <button type="button" onClick={async () => await setGameRunningProps}>
        START
      </button>
    </div>
  );
};

export default GameStatusModal;
