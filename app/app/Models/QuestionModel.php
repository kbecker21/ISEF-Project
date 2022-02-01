<?php namespace App\Models;  
use CodeIgniter\Model;

  
class QuestionModel extends Model{

	protected $table = 'question';
    protected $primaryKey = 'idQuestion';
    protected $allowedFields = [
    'category_idcategory',  
	'QuestionDescription',
    'Creator_idUser',
    'Approved',
    'Approver_idUser', 
    'CreateDate',
    'Flagged'
];

}
