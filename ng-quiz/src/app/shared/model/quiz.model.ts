/**
 * Dieses Klasse repräsentiert das Model Quiz.
 */
export interface Quiz {
    idQuiz: number,
    idSubject: number,
    playDate: Date,
    idCreatorUser: number,
    idJoinerUser: number,
    firstNameCreator: string,
    lastNameCreator: string,
    subject: string,
    idCategory: number,
    category: string
}

