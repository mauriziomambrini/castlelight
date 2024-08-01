import * as IMAGES from '@/assets/images';
import type { QuestionType } from '@/types/quizTypes.ts';

export const questions: QuestionType[] = [
  {
    image: IMAGES.test,
    answer: 'option1',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Option 4', value: 'option4' },
    ],
  },
  {
    image: '/assets/image2.jpg',
    answer: 'optionB',
    options: [
      { label: 'Option A', value: 'optionA' },
      { label: 'Option B', value: 'optionB' },
      { label: 'Option C', value: 'optionC' },
      { label: 'Option D', value: 'optionD' },
    ],
  },
  {
    image: '/assets/image3.jpg',
    answer: 'optionZ',
    options: [
      { label: 'Option X', value: 'optionX' },
      { label: 'Option Y', value: 'optionY' },
      { label: 'Option Z', value: 'optionZ' },
      { label: 'Option W', value: 'optionW' },
    ],
  },
];
