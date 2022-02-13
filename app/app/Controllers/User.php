<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;


class User extends ResourceController {
    use ResponseTrait;

    /**
     * Liefert alle User zurück
     * @return FirstName, LastName, Email, Password, CreateDate, Status und AccountLevel_idAccountLevel
     * @Vorgang BI-008
     * 
     * */
    public function index(){

      $model = new UserModel();
      
      $data['User'] = $model->orderBy('idUser', 'DESC')->findAll();
      return $this->respond($data);
    }

    /**
     * Liefert einen User zurück
     * @return FirstName, LastName, Email, Password, CreateDate, Status und AccountLevel_idAccountLevel
     * @Vorgang BI-008
     * 
     * */
    public function show($id = null){

        $model = new UserModel();

        $data = $model->find($id);
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No User found');
        }
    }

    /**
     * Erstellung eines Users
     * @param FirstName, LastName, Email, Password, CreateDate, Status und AccountLevel_idAccountLevel
     * @Vorgang BI-008
     * 
     * */
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

    /**
     * Aktualisierung eines Users
     * @param data array
     * @Vorgang BI-008
     * 
     * */
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



    /**
     * Löschen eines Users
     * @param id subject
     * @Vorgang BI-008
     * 
     * */
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