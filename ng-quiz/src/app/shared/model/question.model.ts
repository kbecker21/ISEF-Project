/**
 * Dieses Klasse repräsentiert das Model Frage.
 */
 export interface Question {    
    id: number,
    category_idcategory: number,
    QuestionDescription: string,
    Approved: boolean,
    CreateDate: string, 
}