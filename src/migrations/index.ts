import * as migration_20260924_091319_init from './20260924_091319_init'

export const migrations = [
  {
    up: migration_20260924_091319_init.up,
    down: migration_20260924_091319_init.down,
    name: '20260924_091319_init',
  },
]
