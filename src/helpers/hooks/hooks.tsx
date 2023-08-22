import { useState } from 'react';
import _ from 'lodash';

import type { GameRunningType } from '../../types/types';

const UseGameEndHandler = (winLose: 'win' | 'lose') => {
  const [gameRunning, setGameRunning] = useState<GameRunningType>({
    status: 'init',
    running: false,
  });

  const gameRunningCopy = _.cloneDeep(gameRunning);

  gameRunningCopy.running = false;
  gameRunningCopy.status = winLose;
  setGameRunning({ ...gameRunningCopy });

  return gameRunning;
};
