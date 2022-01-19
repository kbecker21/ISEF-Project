<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\QuizModel;


class Quiz extends ResourceController {
    use ResponseTrait;

        
    // all Quizs
    public function index(){
        
      $model = new QuizModel();
      $model->where('Joiner_idUser1', NULL);
      $model->select('quiz.idQuiz, quiz.PlayDate, subject.idSubject, subject.Name, quiz.Creator_idUser, user.FirstName, user.LastName');
      $model->join('user', 'user.idUser = quiz.Creator_idUser', 'left');
      $model->join('subject', 'subject.idSubject = quiz.Subject_idSubject', 'left');
      $data['Quiz'] = $model->findAll();

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Quiz found');
        }
    }


    // create
    public function create() {

        $model = new QuizModel();
        $session = session();

        $data = [
            'Subject_idSubject'  => $this->request->getVar('Subject_idSubject'),
            'Creator_idUser' => $session->get('idUser'), 
            'PlayDate'  => date("Y-m-d H:i:s")
        ];

        $model->insert($data);

        $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'Quiz created successfully'
          ]
      ];
      
      return $this->respondCreated($response);

    }


        // update
    public function update($id = null){

        $model = new QuizModel();
        $rawdata = $this->request->getJSON(true);     
        //var_dump($rawdata);
        $filteredData = remove_empty($rawdata);
        $model->update($id, $filteredData);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Quiz updated successfully'
          ]
      ];
      return $this->respond($response);
    }

}