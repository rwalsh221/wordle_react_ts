import classes from './GameStatusModal.module.css';

type GameStatusModalPropTypes = {
  setGameRunningProps: () => void;
  gameStatusProps: 'win' | 'lose' | 'init' | 'running';
};

const GameStatusModal = ({
  setGameRunningProps,
  gameStatusProps,
}: GameStatusModalPropTypes) => {
  const modalContentHandler = () => {
    let content = 'HELLO!, Please press start to play the game';
    if (gameStatusProps === 'win') {
      content = 'CONGRATULATIONS!, Please press start to play the game';
    }
    if (gameStatusProps === 'lose') {
      content = 'BAD LUCK!, Please press start to play the game';
    }
    return content;
  };

  return (
    <div className={classes.game_status_modal}>
      <p>{modalContentHandler()}</p>
      <button type="button" onClick={setGameRunningProps}>
        START
      </button>
    </div>
  );
};

export default GameStatusModal;
