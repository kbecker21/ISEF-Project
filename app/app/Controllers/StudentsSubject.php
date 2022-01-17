<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\SubjectModel;


class StudentsSubject extends ResourceController {
    use ResponseTrait;

        
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

}