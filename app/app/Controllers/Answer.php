<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\AnswersModel;


class Answer extends ResourceController {
    use ResponseTrait;

    /* all Answerss
    public function index(){

      $model = new AnswersModel();

      $data['Answers'] = $model->orderBy('idAnswers', 'DESC')->findAll();
      return $this->respond($data);
    }

     single Answers
    public function show($id = null){

        $model = new AnswersModel();

        $data = $model->find($id);
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Answers found');
        }
    }*/

    // Answers by question
    public function show($id = null){

        $model = new AnswersModel();

        $data['Answers'] = $model->where('Question_idQuestion', $id)->findAll();

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Answers found');
        }
    }

    // create
    public function create() {

        $model = new AnswersModel();
        $session = session();
        
        $data = [
            'Question_idQuestion'  => $this->request->getVar('Question_idQuestion'),
            'Description' => $this->request->getVar('Description'),
            'Truth' => $this->request->getVar('Truth')
        ];

        $model->insert($data);

        $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'Answers created successfully'
          ]
      ];
      
      return $this->respondCreated($response);

    }

    // update
    public function update($id = null){

        $model = new AnswersModel();
        
        $rawdata = $this->request->getJSON(true);     
        //var_dump($rawdata);
        $filteredData = remove_empty($rawdata);
        $model->update($id, $filteredData);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Answers updated successfully'
          ]
      ];
      return $this->respond($response);
    }

   

    // delete 
    public function delete($id = null){

        $model = new AnswersModel();

        $data = $model->find($id);

        if($data){
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Answers successfully deleted'
                ]
            ];
            return $this->respondDeleted($response);
        }else{
            return $this->failNotFound('No Answers found');
        }
    }

    public function checkForUnique($questionID, $answerID){

        $model = new AnswersModel();
        
        $data = $model->where('Question_idQuestion', $questionID)->where('Truth', 1)->where('idAnswers !=', $answerID)->countAllResults();
        
        if($data){
            return $this->respond($data);
        }else{
            return $this->respond(0);
        }
    }


}