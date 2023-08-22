import _ from 'lodash';

type StateCopy = {
  state: object;
  keys: string[] | null;
};

const test = {
  a: 1,
  b: '2',
};

const test3 = _.cloneDeep(test);

const test2 = ['1', 1];

export const copyState = (stateInput: object, keys = false) => {
  const stateCopy: StateCopy = {
    state: _.clone(stateInput),
    keys: null,
  };

  if (keys) {
    stateCopy.keys = Object.keys(stateInput);
  }
  const test4 = { a: 's', b: 2 };
  const test5 = _.cloneDeep(test4);
  return stateCopy;
};
