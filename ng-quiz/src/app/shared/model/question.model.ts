/**
 * Dieses Klasse repräsentiert das Model Frage.
 */
 export interface Question {    
    id: number,
    idCategory: number,
    QuestionDescription: string,
    Approved: boolean,
    CreateDate: string, 
}