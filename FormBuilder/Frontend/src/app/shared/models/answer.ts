export interface Answer {
    answerId?: number; // optional if it's auto-generated
    answerOptionNumber: number;
    questionNumber: number;
    answer: string;
  }
  