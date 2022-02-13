<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\SubjectModel;
use App\Models\UserModel;
use App\Models\AnswersModel;


class Students extends ResourceController {
    use ResponseTrait;

     /**
     * Liefert die Antworten für Gefragte Antwort
     * @param id Question ID
     * @return Liefert beschreibung, boolean
     * @Vorgang BI-006
     * 
     * */
    public function showAnswers($id = null){

        $model = new AnswersModel();

        $data['Answers'] = $model->where('Question_idQuestion', $id)->findAll();

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Answers found');
        }
    }

    /**
     * Liefert ein einen Benutzer zurück
     * @param id Question ID
     * @return Liefert beschreibung, boolean
     * @Vorgang BI-004
     * 
     * */
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

        
    /**
     * Liefert alle Module zurück
     * @param 
     * @return Liefert Name, Creator zurück
     * @Vorgang BI-010
     * 
     * */
    public function index(){
        
      $model = new SubjectModel();

      $data['Subject'] = $model->orderBy('idSubject', 'ASC')->findAll();


      return $this->respond($data);
    }

    /**
     * Liefert ein Module zurück
     * @param 
     * @return Liefert Name, Creator zurück
     * @Vorgang BI-010
     * 
     * */
    public function show($id = null){

        $model = new SubjectModel();

        $data = $model->find($id);
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Subject found');
        }
    }

    /**
     * Liefert alle User zurück
     * @param 
     * @return Liefert FirstName, LastName und Email zurück
     * @Vorgang BI-004
     * 
     * */
    public function getAllUser(){

        $model = new UserModel();
        $model->select('idUser, FirstName, LastName, Email');
        $data['user'] = $model->findAll();

      return $this->respond($data);
    }

}