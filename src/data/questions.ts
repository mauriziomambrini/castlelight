import * as IMAGES from '@/assets/images';
import type { QuestionTypes } from '@/types/quizTypes.ts';

export const questions: QuestionTypes[] = [
  {
    key: 'img_1',
    image: IMAGES.test,
    answer: 'img_1_a',
    options: ['img_1_a', 'img_1_b', 'img_1_c', 'img_1_d'],
  },
  {
    key: 'img_2',
    image: '/assets/image2.jpg',
    answer: 'img_2_a',
    options: ['img_2_a', 'img_2_b', 'img_3_c', 'img_2_d'],
  },
];
