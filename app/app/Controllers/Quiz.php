<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\QuizModel;
use App\Models\ResultsModel;
use App\Models\QuestionModel;


class Quiz extends ResourceController {
    use ResponseTrait;

        
    /**
     * Liefert alle Quiz zurück
     * @return idQuiz, PlayDate, idSubject, idcategory, CategoryName, SubjectName, Creator_idUser, FirstName, LastName, Joiner_idUser1
     * @Vorgang BI-008
     * 
     * */
    public function index(){
        
      $model = new QuizModel();
      $model->select('quiz.idQuiz, quiz.PlayDate, subject.idSubject, category.idcategory, category.Name AS CategoryName,  subject.Name AS SubjectName, quiz.Creator_idUser, user.FirstName, user.LastName, quiz.Joiner_idUser1');
      $model->join('category', 'category.idcategory = quiz.category_idcategory', 'left');
      $model->join('user', 'user.idUser = quiz.Creator_idUser', 'left');
      $model->join('subject', 'subject.idSubject = quiz.Subject_idSubject', 'left');
      $data['Quiz'] = $model->findAll();

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Quiz found');
        }
    }


    /**
     * Erstellung eine Quiz
     * @param Subject_idSubject, category_idcategory, Creator_idUser und PlayDate
     * @Vorgang BI-005
     * 
     * */
    public function create() {

        $model = new QuizModel();
        $session = session();

        $data = [
            'Subject_idSubject'  => $this->request->getVar('Subject_idSubject'),
            'category_idcategory'  => $this->request->getVar('category_idcategory'),
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

    /**
     * Erstellung der Resultate
     * @param User_idUser, Quiz_idQuiz, Points.
     * @Vorgang BI-007
     * 
     * */
    public function postResult() {

        $modelResult = new ResultsModel();

        $data = [
            'User_idUser'  => $this->request->getVar('User_idUser'),
            'Quiz_idQuiz'  => $this->request->getVar('Quiz_idQuiz'),
            'Points' => $this->request->getVar('Points'), 
            'Winner'  => $this->request->getVar('Winner')
        ];

        $modelResult->insert($data);

        $this->finishGame($data);

        $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'Results added successfully'
          ]
      ];
      
      return $this->respondCreated($response);

    }

    /**
     * Aktualisierung des Quiz
     * @param Data array
     * @Vorgang BI-005
     * 
     * */
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


    /**
     * Liefert zufällige Fragen von einem Module and Kategorie zurück
     * @param ID Subjekt & Category
     * @return Liefert idQuestion, category_idcategory, Subject_idSubject, QuestionDescription
     * @Vorgang BI-006
     * 
     * */
    public function getQuestions($idSubject = null, $idCategory = null){

        $model = new QuestionModel();
        $model->select('question.idQuestion, question.category_idcategory, category.Subject_idSubject, question.QuestionDescription');
        $model->join('category', 'category.idcategory = question.category_idcategory', 'left');
        $model->where('category.Subject_idSubject', $idSubject);
        $model->where('question.category_idcategory', $idCategory);
        $model->orderBy('question.idQuestion', 'RANDOM');
        $model->limit('10');
        $data['questions'] = $model->find();

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No quiz found');
        }
    }

    /**
     * Liefert aktuelles spiel zurück
     * @param ID User
     * @return Liefert idQuiz, PlayDate, idSubject, SubjectName, idcategory, CategoryName, Creator_idUser, FirstName, LastName, Joiner_idUser1, FinishCreator, FinishJoiner
     * @Vorgang BI-006
     * 
     * */
    public function getGameByPlayer($id = null){
      $model = new QuizModel();
      $model->select('quiz.idQuiz, quiz.PlayDate, subject.idSubject, subject.Name AS SubjectName,category.idcategory, category.Name AS CategoryName,  quiz.Creator_idUser, user.FirstName, user.LastName, quiz.Joiner_idUser1, quiz.FinishCreator, quiz.FinishJoiner');
      $model->where('quiz.Creator_idUser', $id);
      $model->orWhere('quiz.Joiner_idUser1', $id);
      $model->where('quiz.FinishCreator', NULL);  
      $model->where('quiz.FinishJoiner', NULL);       
      $model->join('category', 'category.idcategory = quiz.category_idcategory', 'left');
      $model->join('user', 'user.idUser = quiz.Creator_idUser', 'left');
      $model->join('subject', 'subject.idSubject = quiz.Subject_idSubject', 'left');
      $data['Quiz'] = $model->find();

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Quiz found');
        }
    }


    /**
     * Liefert alle Ergebnisse der User zurück
     * @return User_idUser, FirstName, LastName, TotalPoints, TotalWins
     * @Vorgang BI-007
     * 
     * */
    public function getRanking(){

        $this->updateWinner();

        $ResultsModel = new ResultsModel();      

        $ResultsModel->select('results.User_idUser, user.FirstName, user.LastName, SUM(Points) AS TotalPoints, SUM(Winner) AS TotalWins');
        $ResultsModel->join('user', 'user.idUser = results.User_idUser', 'left');
        $ResultsModel->orderBy('TotalPoints', 'ASC');
        $ResultsModel->groupBy('results.User_idUser');
        $ResultsModel->groupBy('user.FirstName');
        $ResultsModel->groupBy('user.LastName');

        $data = $ResultsModel->findAll();

        

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Quiz found');
        }
    }

        /**
         * Löschen eines Quiz (Abbrechen)
         * @param id subject
         * @Vorgang BI-008
         * 
         * */ 
        public function delete($id = null){

            $ResultsModel = new ResultsModel();

            $QuizModel = new QuizModel();
    
            $data = $QuizModel->find($id);
            if($data){
                $ResultsModel->where('Quiz_idQuiz', $id)->delete();
                $QuizModel->delete($id);
                $response = [
                    'status'   => 200,
                    'error'    => null,
                    'messages' => [
                        'success' => 'Quiz successfully deleted'
                    ]
                ];
                return $this->respondDeleted($response);
            }else{
                return $this->failNotFound('No Quiz found');
            }
        }

    /**
     * Liefert alle Ergebnisse der User zurück
     * @return PlayDate, OpponentFn, OpponentLn, Points, Winner
     * @Vorgang BI-009
     * 
     * */
    public function getPlayerHistory(){
      $model = new ResultsModel();
      $session = session();


      $model->select('quiz.PlayDate, user.FirstName AS OpponentFn, user.LastName AS OpponentLn, Points, Winner');
      $model->where('results.User_idUser', $session->get('idUser'));
      $model->join('quiz', 'quiz.idQuiz = results.Quiz_idQuiz', 'left');
      $model->join('user', 'user.idUser = quiz.Joiner_idUser1', 'left');
      $data = $model->find();

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No games found');
        }
    }

    /**
     * Gewinner updaten
     * 
     * @Vorgang BI-014
     * 
     * */
    private function updateWinner() {

        $ResultsModel = new ResultsModel();

        $data = $ResultsModel->orderBy('Quiz_idQuiz', 'DESC')->findAll();

        foreach ($data as $Quiz_idQuiz => $Nummer ) {
            $model = new ResultsModel();
            $model->where('results.Quiz_idQuiz', $Nummer["Quiz_idQuiz"]);
            $model->where('results.User_idUser !=', $Nummer["User_idUser"]);
            $data1 = $model->find();
            if ($data1){
                if ($Nummer["Points"] > $data1[0]["Points"]){

                    $winner = [
                        'Winner'  => 1
                    ];
                $model->where('results.User_idUser', $Nummer["User_idUser"]);
                $model->update($Nummer["Quiz_idQuiz"], $winner);
              
                } elseif ($Nummer["Points"] == $data1[0]["Points"]){
                    $winner = [
                        'Winner'  => NULL
                    ];
    
                $model->where('results.User_idUser', $Nummer["User_idUser"]);
                $model->update($Nummer["Quiz_idQuiz"], $winner);
    
                }else {
                    $winner = [
                        'Winner'  => 0
                    ];
    
                $model->where('results.User_idUser', $Nummer["User_idUser"]);
                $model->update($Nummer["Quiz_idQuiz"], $winner);
                }
            }
             
        }
    }
    /**
     * Spiel als beendet markieren
     * @param Data array
     * @Vorgang BI-015
     * 
     * */
    private function finishGame($array) {
    
      $model = new QuizModel();
    
      $model->where('quiz.idQuiz', $array["Quiz_idQuiz"]);
      $model->where('quiz.Creator_idUser', $array["User_idUser"]);
      $model->orWhere('quiz.Joiner_idUser1', $array["User_idUser"]);     
      $data = $model->find();
        
            if ($data[0]["Creator_idUser"] == $array["User_idUser"] ){

                $finisher = [

                    'FinishCreator' => 1,
                ];
          
            }else {

                $finisher = [
                    'FinishJoiner' => 1
                    
                ];                     
            }
        $model->update($array["Quiz_idQuiz"],$finisher);    
    }        
}