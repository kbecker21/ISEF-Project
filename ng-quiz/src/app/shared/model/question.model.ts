/**
 * Dieses Klasse repräsentiert das Model Frage.
 */
 export interface Question {    
    idQuestion: number,
    category_idcategory: number,
    QuestionDescription: string,
    Approved: number,
    Flagged: number,
    CreateDate: string    
}