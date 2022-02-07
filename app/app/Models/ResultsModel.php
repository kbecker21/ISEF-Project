<?php namespace App\Models;  
use CodeIgniter\Model;

  
class ResultsModel extends Model{

    protected $table = 'results';
    protected $primaryKey = 'Quiz_idQuiz';
    protected $allowedFields = [
    'User_idUser',
    'Quiz_idQuiz',  
    'Points',
    'Winner'];

}