<?php namespace App\Models;  
use CodeIgniter\Model;

  
class ResultsModel extends Model{

	protected $table = 'quiz';
    protected $primaryKey = 'idQuiz';
    protected $allowedFields = [
    'User_idUser',
    'Quiz_idQuiz',  
	'Points',
    'Winner'];

}