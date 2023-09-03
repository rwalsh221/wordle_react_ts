import _ from 'lodash';

type StateCopy = {
  state: object;
  keys: string[] | null;
};

export const copyState = (stateInput: object, keys = false) => {
  const stateCopy: StateCopy = {
    state: _.clone(stateInput),
    keys: null,
  };

  if (keys) {
    stateCopy.keys = Object.keys(stateInput);
  }

  return stateCopy;
};

export const validateKeyPressedHandler = (
  keyPressed: string | null,
  keyPressedCode: string
) => {
  let validate = true;
  if (keyPressed === null) {
    validate = false;
    return validate;
  }
  if (keyPressedCode[0] !== 'K') {
    validate = false;
  }
  if (keyPressedCode === 'Backspace') {
    validate = true;
  }
  if (keyPressedCode === 'Enter') {
    validate = true;
  }

  return validate;
};
