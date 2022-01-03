<?php namespace App\Models;  
use CodeIgniter\Model;

  
class UserModel extends Model{

    protected $table = 'user';
    protected $primaryKey = 'idUser';
    protected $allowedFields = [
    'FirstName',
    'LastName', 
    'Email',
    'Password',
    'Status',
    'CreateDate',
    'AccountLevel_idAccountLevel',
    'Lastupdated',
    ];


    protected $beforeInsert = ['beforeInsert'];
    protected $beforeUpdate = ['beforeUpdate'];

    protected function beforeInsert(array $data): array {
        return $this->getUpdatedDataWithHashedPassword($data);
    }

    protected function beforeUpdate(array $data): array {
        return $this->getUpdatedDataWithHashedPassword($data);
    }

    private function getUpdatedDataWithHashedPassword(array $data): array {
        if (isset($data['data']['Password'])) {
            $plaintextPassword = $data['data']['Password'];
            $data['data']['Password'] = $this->hashPassword($plaintextPassword);
        }
        return $data;
    }

    private function hashPassword(string $plaintextPassword): string {
        return password_hash($plaintextPassword, PASSWORD_BCRYPT);
    }

}