<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\SubjectModel;
use App\Models\UserModel;
use App\Models\AnswersModel;


class Students extends ResourceController {
    use ResponseTrait;

        // Answers by question
    public function showAnswers($id = null){

        $model = new AnswersModel();

        $data['Answers'] = $model->where('Question_idQuestion', $id)->findAll();

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Answers found');
        }
    }


    public function getUser($id = null){

        $model = new UserModel();
        $model->select('idUser, FirstName, LastName, Email');
        $data = $model->find($id);
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No User found');
        }
    }

        
    // all Subjects
    public function index(){
        
      $model = new SubjectModel();

      $data['Subject'] = $model->orderBy('idSubject', 'ASC')->findAll();


      return $this->respond($data);
    }

    // single Subject
    public function show($id = null){

        $model = new SubjectModel();

        $data = $model->find($id);
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Subject found');
        }
    }

       public function getAllUser(){

        $model = new UserModel();
        $model->select('idUser, FirstName, LastName, Email');
        $data['user'] = $model->findAll();

      return $this->respond($data);
    }

}