import classes from './Keyboard.module.css';
import Key from './Key/Key';

import type {
  KeyboardControllerType,
  KeyboardControllerTypex,
} from '../../types/types';

type KeyboardPropTypes = {
  keyboardControllerProps: KeyboardControllerTypex;
  keyboardClickHandlerProps: (arg0: string) => void;
};

const Keyboard = ({
  keyboardControllerProps,
  keyboardClickHandlerProps,
}: KeyboardPropTypes) => {
  return (
    <div className={classes.keyboard}>
      <div className={classes.keyboard_top_container}>
        {/* TOP ROW */}
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="q"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="w"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="e"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="r"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="t"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="y"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="u"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="i"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="o"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="p"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
      </div>
      <div className={classes.keyboard_bottom_container}>
        {/* MIDDLE ROW */}
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="a"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="s"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="d"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="f"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="g"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="h"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="j"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="k"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="l"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        {/* BOTTOM ROW */}
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="del"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
          keyboardClickInputProps="Backspace"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="z"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="x"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="c"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="v"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="b"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="n"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="m"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="enter"
          keyboardClickHandlerProps={keyboardClickHandlerProps}
          keyboardClickInputProps="Enter"
        ></Key>
      </div>
    </div>
  );
};

export default Keyboard;
