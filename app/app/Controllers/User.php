<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;


class User extends ResourceController {
    use ResponseTrait;

    // all users
    public function index(){

      $model = new UserModel();
      
      $data['User'] = $model->orderBy('idUser', 'DESC')->findAll();
      return $this->respond($data);
    }

    // single user
    public function show($id = null){

        $model = new UserModel();

        $data = $model->find($id);
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No User found');
        }
    }

    // create
    public function create() {

        $model = new UserModel();

        $data = [
            'FirstName' => $this->request->getVar('FirstName'),
            'LastName' => $this->request->getVar('LastName'),
            'Email'  => $this->request->getVar('Email'),
            'Password'  => $this->request->getVar('Password'),
            'CreateDate'  => date("Y-m-d H:i:s"),
            'Status'  => 0,
            'AccountLevel_idAccountLevel'  => 3
        ];

        $model->insert($data);

        $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'User created successfully'
          ]
      ];
      
      return $this->respondCreated($response);

    }

    // update
    public function update($id = null){

        $model = new UserModel();
        
        $rawdata = $this->request->getJSON(true);     
        //var_dump($rawdata);
        $filteredData = remove_empty($rawdata);
        $model->update($id, $filteredData);
       
        $model->update($id, $rawdata);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'User updated successfully'
          ]
      ];
      return $this->respond($response);
    }



    // delete 
    public function delete($id = null){

        $model = new UserModel();

        $data = $model->find($id);
        if($data){
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'User successfully deleted'
                ]
            ];
            return $this->respondDeleted($response);
        }else{
            return $this->failNotFound('No User found');
        }
    }

}