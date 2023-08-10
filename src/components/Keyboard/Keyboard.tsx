import classes from './Keyboard.module.css';
import Key from './Key/Key';

import type { KeyboardControllerType } from '../../types/types';

type KeyboardPropTypes = {
  keyboardControllerProps: KeyboardControllerType;
};

const Keyboard = ({ keyboardControllerProps }: KeyboardPropTypes) => {
  return (
    <div className={classes.keyboard}>
      <div className={classes.keyboard_top_container}>
        {/* TOP ROW */}
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="q"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="w"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="e"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="r"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="t"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="y"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="u"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="i"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="o"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="p"
        ></Key>
      </div>
      <div className={classes.keyboard_bottom_container}>
        {/* MIDDLE ROW */}
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="a"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="s"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="d"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="f"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="g"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="h"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="j"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="k"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="l"
        ></Key>
        {/* BOTTOM ROW */}
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="del"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="z"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="x"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="c"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="v"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="b"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="n"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="m"
        ></Key>
        <Key
          keyboardControllerProps={keyboardControllerProps}
          keyIconProps="enter"
        ></Key>
      </div>
    </div>
  );
};

export default Keyboard;
