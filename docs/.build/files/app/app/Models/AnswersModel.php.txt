<?php namespace App\Models;  
use CodeIgniter\Model;

  
class AnswersModel extends Model{

	protected $table = 'answers';
    protected $primaryKey = 'idAnswers';
    protected $allowedFields = [
    'Question_idQuestion',  
	'Description',
    'Truth'];

}