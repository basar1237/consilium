import * as migration_20260407_211538_initial from './20260407_211538_initial';
import * as migration_20260409_181729_enterprise_showcase_card_backgrounds from './20260409_181729_enterprise_showcase_card_backgrounds';

export const migrations = [
  {
    up: migration_20260407_211538_initial.up,
    down: migration_20260407_211538_initial.down,
    name: '20260407_211538_initial',
  },
  {
    up: migration_20260409_181729_enterprise_showcase_card_backgrounds.up,
    down: migration_20260409_181729_enterprise_showcase_card_backgrounds.down,
    name: '20260409_181729_enterprise_showcase_card_backgrounds'
  },
];
