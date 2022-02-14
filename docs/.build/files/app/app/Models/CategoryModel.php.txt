<?php namespace App\Models;  
use CodeIgniter\Model;

  
class CategoryModel extends Model{

	protected $table = 'category';
    protected $primaryKey = 'idCategory';
    protected $allowedFields = [
    'Subject_idSubject',  
	'Name',
    'Creator_idUser', 
    'CreateDate'];
}