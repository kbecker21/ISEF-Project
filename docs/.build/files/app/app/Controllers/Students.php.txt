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
     * 
     * @param int $id übergibt die ID der Frage
     * @return mixed[] $data Liefert beschreibung, boolean
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
     * Liefert einen User zurück
     * 
     * @param int $id übergibt die ID eines Users
     * 
     * @return mixed[] $data Liefert einen array mit allen Usern und attributen zurück
     * @Vorgang BI-008
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
     * 
     * @return mixed[] $data Liefert einen array mit allen Modulen und attributen zurück
     * @Vorgang BI-010
     * 
     * */
    public function index(){
        
      $model = new SubjectModel();

      $data['Subject'] = $model->orderBy('idSubject', 'ASC')->findAll();


      return $this->respond($data);
    }

    /**
     * Liefert alle Module zurück
     * 
     * @return mixed[] $data Liefert einen array mit allen Modulen und attributen zurück
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
     * 
     * @return mixed[] $data Liefert einen array mit allen Usern und attributen zurück
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