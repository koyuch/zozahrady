import * as migration_20260924_091319_init from './20260924_091319_init'
import * as migration_20260926_181726_pages_blocks_localization from './20260926_181726_pages_blocks_localization'

export const migrations = [
  {
    up: migration_20260924_091319_init.up,
    down: migration_20260924_091319_init.down,
    name: '20260924_091319_init',
  },
  {
    up: migration_20260926_181726_pages_blocks_localization.up,
    down: migration_20260926_181726_pages_blocks_localization.down,
    name: '20260926_181726_pages_blocks_localization',
  },
]
