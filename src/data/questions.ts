import * as IMAGES from '@/assets/images';
import type { QuestionTypes } from '@/types/quizTypes.ts';

export const questions: QuestionTypes[] = [
  {
    key: 'archers_castle',
    image: IMAGES.archersCastle,
    answer: 'archers_castle_a',
    options: ['archers_castle_a', 'archers_castle_b', 'archers_castle_c'],
  },
  {
    key: 'dragon_castle',
    image: IMAGES.dragonCastle,
    answer: 'archers_castle_a',
    options: ['dragon_castle_a', 'dragon_castle_b', 'dragon_castle_c'],
  },
  {
    key: 'minstrel_wall',
    image: IMAGES.minstrelWall,
    answer: 'minstrel_wall_a',
    options: ['minstrel_wall_a', 'minstrel_wall_b', 'minstrel_wall_c'],
  },
  {
    key: 'outlaw_tower',
    image: IMAGES.outlawTower,
    answer: 'outlaw_tower_a',
    options: ['outlaw_tower_a', 'outlaw_tower_b', 'outlaw_tower_c'],
  },
  {
    key: 'outlaw_wood',
    image: IMAGES.outlawWood,
    answer: 'outlaw_wood_a',
    options: ['outlaw_wood_a', 'outlaw_wood_b', 'outlaw_wood_c'],
  },
  {
    key: 'princess_tower',
    image: IMAGES.princessTower,
    answer: 'princess_tower_a',
    options: ['princess_tower_a', 'princess_tower_b', 'princess_tower_c'],
  },
  {
    key: 'knights_return',
    image: IMAGES.knightsReturn,
    answer: 'knights_return_a',
    options: ['knights_return_a', 'knights_return_b', 'knights_return_c'],
  },
  {
    key: 'outlaw_escape',
    image: IMAGES.outlawEscape,
    answer: 'outlaw_escape_a',
    options: ['outlaw_escape_a', 'outlaw_escape_b', 'outlaw_escape_c'],
  },
  {
    key: 'sea_monster',
    image: IMAGES.seaMonster,
    answer: 'outlaw_escape_a',
    options: ['sea_monster_a', 'sea_monster_b', 'sea_monster_c'],
  },
];
