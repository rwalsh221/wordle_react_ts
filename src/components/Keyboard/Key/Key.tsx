import classes from './Key.module.css';

import type { KeyboardControllerType } from '../../../types/types';

type KeyProps = {
  keyIconProps: string;
  keyboardControllerProps: KeyboardControllerType;
};

const Key = ({ keyIconProps, keyboardControllerProps }: KeyProps) => {
  const keyStyleHandler = () => {
    if (keyboardControllerProps.inCorrectPlace.indexOf(keyIconProps) !== -1) {
      return 'input__in_correct_place';
    } else if (
      keyboardControllerProps.inWinningWord.indexOf(keyIconProps) !== -1
    ) {
      return 'input__in_word';
    } else if (
      keyboardControllerProps.notInWinningWord.indexOf(keyIconProps) !== -1
    ) {
      return 'input__not_in_word';
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
