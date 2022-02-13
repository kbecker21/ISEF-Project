<?php namespace App\Controllers;
 
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
 
class Register extends ResourceController {

    use ResponseTrait;


    /**
     * Registrierung eines neues Unsers
     * @param firstname, lastname, email, password, CreateDate, status, AccountLevel_idAccountLevel
     * @Vorgang BI-002
     * 
     * */ 
    public function index() {
        helper(['form']);

        $rules = [
            'email' => 'is_unique[user.Email]', 
        ];
        
        if(!$this->validate($rules)) return $this->respond(['error' => 'Email exists.'], 401); 

        $data = [
            'FirstName' => $this->request->getVar('firstname'),
            'LastName' => $this->request->getVar('lastname'),
            'Email'  => $this->request->getVar('email'),
            'Password'  => $this->request->getVar('password'),
            'CreateDate'  => date("Y-m-d H:i:s"),
            'Status'  => 0,
            'AccountLevel_idAccountLevel'  => 3
        ];

        $model = new UserModel();
        $registered = $model->insert($data);
        $this->respondCreated($registered);
 
    }
 
}