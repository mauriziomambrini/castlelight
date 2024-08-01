export type OptionType = {
  label: string;
  value: string;
};

export type QuestionType = {
  image: string;
  answer: string;
  options: OptionType[];
};
