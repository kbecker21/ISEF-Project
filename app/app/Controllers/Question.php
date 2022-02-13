<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\QuestionModel;
use App\Models\AnswersModel;
use App\Models\CategoryModel;

class Question extends ResourceController {
    use ResponseTrait;

    /**
     * Liefert alle Fragen zurück
     * @return Liefert beschreibung, ersteller
     * @Vorgang BI-012
     * 
     * */
    public function index(){

      $QuestionModel = new QuestionModel();

      $data['Question'] = $QuestionModel->orderBy('idQuestion', 'DESC')->findAll();

      return $this->respond($data);

    }


    /**
     * Liefert eine Frage zurück
     * @param id Question ID
     * @return Liefert beschreibung, ersteller
     * @Vorgang BI-012
     * 
     * */
    public function show($id = null){

        $QuestionModel = new QuestionModel();

        $data = $QuestionModel->find($id);

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No User found');
        }
    }

    /**
     * Erstellung der Frage
     * @param category_idcategory, QuestionDescription, idUser und CreateDate
     * @Vorgang BI-012
     * 
     * */
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

    /**
     * Aktuellisierung die Frage
     * @param Data Array
     * @Vorgang BI-012
     * 
     * */
    public function update($id = null){
        $QuestionModel = new QuestionModel(); 
        
        $rawdata = $this->request->getJSON(true);     
        //var_dump($rawdata);
        $filteredData = remove_empty($rawdata);
        $QuestionModel->update($id, $filteredData);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Question updated successfully'
          ]
      ];
      return $this->respond($response);
    }



    /**
     * Löscht eine Frage
     * @param Data Array
     * @Vorgang BI-012
     * 
     * */
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

    /**
     * Liefert alle Fragen zur einer Kategorie zurück
     * @param id Question ID
     * @return Liefert beschreibung, ersteller
     * @Vorgang BI-012
     * 
     * */
    public function showbycourse($id = null, $flagged = null){

        $QuestionModel = new QuestionModel();
        $AnswersModel = new AnswersModel();
        $CategoryModel = new CategoryModel();

        $categories = $CategoryModel->where('Subject_idSubject', $id)->findAll();
        $session = session();
       
        if($categories){

            $result = [];

            foreach ($categories as $keyC => $category) {

                $result[] = [
                    'category' => $category                                       
                ];

                
                if ($session->get('AccountLevel') == 3){
                    $questions = $QuestionModel->where('Category_idCategory', $category['idcategory'])->where('Creator_idUser', $session->get('idUser'))->findAll();                    
                } else {
                    if ($flagged == 'flagged'){                        
                        $questions = $QuestionModel->where('Category_idCategory', $category['idcategory'])->where('flagged', 1)->findAll();
                    } else {
                        $questions = $QuestionModel->where('Category_idCategory', $category['idcategory'])->findAll();
                    }                    
                } 

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
            return $this->respond([
                'status'   => 204,
                'error'    => null,
                'messages' => [
                    'error' => 'No Questions found'
                ]
            ]);
        }
    }



    /**
     * Gibt Summer aller Gemeldeten Fragen zurück
     * @param id Question ID
     * @return Summer aller meldungen
     * @Vorgang BI-013
     * 
     * */
    public function countFlaggedQuestions($id = null) {
        $QuestionModel = new QuestionModel();        
        $CategoryModel = new CategoryModel();

        $categories = $CategoryModel->where('Subject_idSubject', $id)->findAll();

        $count = 0;

        foreach ($categories as $category) {

            $questions = $QuestionModel->where('Category_idCategory', $category['idcategory'])->where('flagged', 1)->countAllResults();
                                  
            $count += $questions;
        } 

        return $this->respond($count);

    }


    /**
     * Gibt Fragen vom Hersteller zurück
     * @param id User
     * @return Alle Fragen die vom User erstellt worden sind
     * @Vorgang BI-012
     * 
     * */
    public function getQuestionByCreator($id = null){

        $model = new QuestionModel();

        $data = $model->where('Creator_idUser', $id)->findAll();
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Quetions found');
        }
    }


}