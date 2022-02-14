<?php namespace App\Models;  
use CodeIgniter\Model;

  
class SubjectModel extends Model{

	protected $table = 'subject';
    protected $primaryKey = 'idSubject';
    protected $allowedFields = [
    'ShortName',
	'Name',
    'Creator_idUser', 
    'Active',
    'CreateDate'];
}


