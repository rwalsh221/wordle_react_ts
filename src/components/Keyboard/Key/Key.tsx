import classes from './Key.module.css';

import type {
  KeyboardControllerType,
  KeyboardControllerTypex,
} from '../../../types/types';

type KeyProps = {
  keyIconProps: string;
  keyboardControllerProps: KeyboardControllerTypex;
  keyboardClickHandlerProps: (arg0: string) => void;
  keyboardClickInputProps?: string;
};

const Key = ({
  keyIconProps,
  keyboardControllerProps,
  keyboardClickHandlerProps,
  keyboardClickInputProps,
}: KeyProps) => {
  const keyStyleHandler = () => {
    if (keyboardControllerProps.inCorrectPlace.has(keyIconProps)) {
      return 'input__in_correct_place';
    } else if (keyboardControllerProps.inWinningWord.has(keyIconProps)) {
      return 'input__in_word';
    } else if (keyboardControllerProps.notInWinningWord.has(keyIconProps)) {
      return 'input__not_in_word';
    } else {
      return 'init';
    }
  };

  const userInput = keyboardClickInputProps
    ? keyboardClickInputProps
    : keyIconProps;

  return (
    <div
      className={`${classes.key} ${classes[keyStyleHandler()]}`}
      onClick={() => keyboardClickHandlerProps(userInput)}
    >
      <span>{keyIconProps}</span>
    </div>
  );
};

export default Key;
