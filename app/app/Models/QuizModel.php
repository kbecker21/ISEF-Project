<?php namespace App\Models;  
use CodeIgniter\Model;

  
class QuizModel extends Model{

	protected $table = 'quiz';
    protected $primaryKey = 'idQuiz';
    protected $allowedFields = [
    'Subject_idSubject',
    'category_idcategory',  
	'PlayDate',
    'Creator_idUser',
    'Joiner_idUser1'];

}