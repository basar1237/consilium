import * as migration_20260407_211538_initial from './20260407_211538_initial';

export const migrations = [
  {
    up: migration_20260407_211538_initial.up,
    down: migration_20260407_211538_initial.down,
    name: '20260407_211538_initial'
  },
];
