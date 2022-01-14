<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\QuestionModel;
use App\Models\AnswersModel;


class Question extends ResourceController {
    use ResponseTrait;

    // all Questions
    public function index(){

      $QuestionModel = new QuestionModel();

      $data['Question'] = $QuestionModel->orderBy('idQuestion', 'DESC')->findAll();

      return $this->respond($data);

    }


    // single Question
    public function show($id = null){

        $QuestionModel = new QuestionModel();

        $data = $QuestionModel->find($id);

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No User found');
        }
    }

    // create
    public function create() {
        $QuestionModel = new QuestionModel(); 
        $session = session();

        $data = [
            'category_idcategory'  => $this->request->getVar('category_idcategory'),
            'QuestionDescription' => $this->request->getVar('QuestionDescription'),
            'Creator_idUser' => $session->get('idUser'),
            'CreateDate'  => date("Y-m-d H:i:s")
        ];

        $QuestionModel->insert($data);
        

        $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'Question created successfully'
          ]
      ];
      
      return $this->respondCreated($response);

    }

    // update
    public function update($id = null){
        $QuestionModel = new QuestionModel(); 
        
        $rawdata = $this->request->getRawInput();
       
        $model->update($id, $rawdata);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Question updated successfully'
          ]
      ];
      return $this->respond($response);
    }



    // delete 
    public function delete($id = null){

        $QuestionModel = new QuestionModel(); 
        $AnswersModel = new AnswersModel();

        $QuestionData = $QuestionModel->find($id);

        if($QuestionData){
            $AnswersModel->where('Question_idQuestion', $id)->delete();
            $QuestionModel->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Question successfully deleted'
                ]
            ];
            return $this->respondDeleted($response);
        }else{
            return $this->failNotFound('No Question found');
        }
    }

}