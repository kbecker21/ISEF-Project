<?php namespace App\Models;  
use CodeIgniter\Model;

  
class QuizModel extends Model{

	protected $table = 'quiz';
    protected $primaryKey = 'idQuiz';
    protected $allowedFields = [
    'Subject_idSubject',  
    'PlayDate',
    'Creator_idUser',
    'Joiner_idUser1',
    'category_idcategory',
    'FinishCreator',
    'FinishJoiner'];
}