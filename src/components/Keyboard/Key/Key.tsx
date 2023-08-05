import classes from './Key.module.css';

type KeyProps = {
  keyIconProps: string;
  keyboardControllerProps: {
    inCorrectPlace: string[];
    inWinningWord: string[];
  };
};

const Key = ({ keyIconProps, keyboardControllerProps }: KeyProps) => {
  const keyStyleHandler = () => {
    if (keyboardControllerProps.inCorrectPlace.indexOf(keyIconProps) !== -1) {
      return 'green';
    } else if (
      keyboardControllerProps.inWinningWord.indexOf(keyIconProps) !== -1
    ) {
      return 'blue';
    } else {
      return 'init';
    }
  };

  return (
    <div className={`${classes.key} ${classes[keyStyleHandler()]}`}>
      {keyIconProps}
    </div>
  );
};

export default Key;
