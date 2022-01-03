<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\QuestionModel;
use App\Models\AnswersModel;
use App\Models\CategoryModel;


class Question extends ResourceController {
    use ResponseTrait;

    // all Questions
    public function index(){

        $QuestionModel = new QuestionModel(); 
        $AnswersModel = new AnswersModel(); 
        $questions = $QuestionModel->findAll();

        $result = [];

        foreach ($questions as $question) {
            $result[] = [
                'question' => $question,
                'answers' => $AnswersModel->where('Question_idQuestion', $question['idQuestion'])->findAll()
            ];
        }

        return $this->respond($result);

    }


    // single Question
    public function show($id = null){

        $QuestionModel = new QuestionModel();
        $AnswersModel = new AnswersModel();

        $questions = $QuestionModel->where('idQuestion', $id)->findAll();



        if($questions){

            $result = [];

            foreach ($questions as $question) {

                $result[] = [
                    'question' => $question,
                    'answers' => $AnswersModel->where('Question_idQuestion', $id)->findAll()
                ];
            }

            return $this->respond($result);
        }else{
            return $this->failNotFound('No Question found');
        }
    }


     // Questions by Course
     public function showbycourse($id = null){

        $QuestionModel = new QuestionModel();
        $AnswersModel = new AnswersModel();
        $CategoryModel = new CategoryModel();

        $categories = $CategoryModel->where('Subject_idSubject', $id)->findAll();

       
        if($categories){

            $result = [];

            foreach ($categories as $keyC => $category) {

                $result[] = [
                    'category' => $category                                       
                ];

                $questions = $QuestionModel->where('Category_idCategory', $category['idcategory'])->findAll();

                
                foreach ($questions as $keyQ => $question) {

                    $result[$keyC]['questions'][] = [
                        'question' => $question                     
                    ];

                    $answers = $AnswersModel->where('Question_idQuestion', $question['idQuestion'])->findAll();

                    foreach ($answers as $keyA => $answer) {

                        $result[$keyC]['questions'][$keyQ]['answers'][] = [
                            'answer' => $answer                        
                        ];
                    }                   

                }               

            }            
            return $this->respond($result);
        }else{
            return $this->failNotFound('No Question found');
        }
    }

    // create
    public function create() {
        $QuestionModel = new QuestionModel(); 
        $AnswersModel = new AnswersModel();
        $session = session();

        $data = [
            'category_idcategory'  => $this->request->getVar('category'),
            'QuestionDescription' => $this->request->getVar('QuestionDescription'),
            'Creator_idUser' => $session->get('idUser'),
            'Approver_idUser' => 1, //NEED to come from session ID!!!!
            'CreateDate'  => date("Y-m-d H:i:s")
        ];

        $QuestionModel->insert($data);
        $questionsID = $QuestionModel->getInsertID();

        $answer1 = [
            'Question_idQuestion'  => $questionsID,
            'Description' => $this->request->getVar('Description1'),
            'Truth' => $this->request->getVar('boolean1')
        ];
        $answer2 = [
            'Question_idQuestion'  => $questionsID,
            'Description' => $this->request->getVar('Description2'),
            'Truth' => $this->request->getVar('boolean2')
        ];
        $answer3 = [
            'Question_idQuestion'  => $questionsID,
            'Description' => $this->request->getVar('Description3'),
            'Truth' => $this->request->getVar('boolean3')
        ];
        $answer4 = [
            'Question_idQuestion'  => $questionsID,
            'Description' => $this->request->getVar('Description4'),
            'Truth' => $this->request->getVar('boolean4')
        ];

        $AnswersModel->insert($answer1);
        $AnswersModel->insert($answer2);
        $AnswersModel->insert($answer3);
        $AnswersModel->insert($answer4);

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
        $AnswersModel = new AnswersModel();

        $data = [
            'category_idcategory'  => $this->request->getVar('category'),
            'QuestionDescription' => $this->request->getVar('QuestionDescription'),    
            'Approved' => $this->request->getVar('approved'),
            'Approver_idUser' => 1
        ];
        $QuestionModel->update($id, $data);
/* WORK NEEDED
        $answer1 = [
            'Question_idQuestion'  => $questionsID,
            'Description' => $this->request->getVar('Description1'),
            'Truth' => $this->request->getVar('boolean1')
        ];
        $answer2 = [
            'Question_idQuestion'  => $questionsID,
            'Description' => $this->request->getVar('Description2'),
            'Truth' => $this->request->getVar('boolean2')
        ];
        $answer3 = [
            'Question_idQuestion'  => $questionsID,
            'Description' => $this->request->getVar('Description3'),
            'Truth' => $this->request->getVar('boolean3')
        ];
        $answer4 = [
            'Question_idQuestion'  => $questionsID,
            'Description' => $this->request->getVar('Description4'),
            'Truth' => $this->request->getVar('boolean4')
        ];
        
        $AnswersModel->update($answer1);
        $AnswersModel->update($answer2);
        $AnswersModel->update($answer3);
        $AnswersModel->update($answer4);
*/
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