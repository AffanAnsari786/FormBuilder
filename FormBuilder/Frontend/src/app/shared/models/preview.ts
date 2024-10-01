import { Answer } from "./answer";

export interface PreviewAllQuestion {
  questionNumber: number;
  questionType: string;
  question: string;
  answers: Answer[];
};


