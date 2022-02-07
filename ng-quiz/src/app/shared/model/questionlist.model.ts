import { Category } from './category.model';
import { Question } from './question.model';
import { Answer } from './answer.model';
/**
 * Dieses Klasse repräsentiert das Model Frage.
 */
export interface QuestionList {
  Category: Category[];
  Question: Question[];
  Answer: Answer[];
}
