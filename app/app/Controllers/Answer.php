<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\AnswersModel;


class Answer extends ResourceController {
    use ResponseTrait;

    /**
     * Liefert die Antworten für Gefragte Antwort
     * 
     * @param int $id übergibt die ID der Frage
     * @return mixed[] $data Liefert beschreibung, boolean
     * @Vorgang BI-006
     * 
     * */

    public function show($id = null){

        $model = new AnswersModel();

        $data['Answers'] = $model->where('Question_idQuestion', $id)->findAll();

        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Answers found');
        }
    }


    /**
     * Erstellung der Antwort
     * @Vorgang BI-012
     * @param int $_GET['Question_idQuestion'] Id der Frage
     * @param string $_GET['Description'] Beschreibung der Antwort
     * @param int $_GET['Truth'] Gibt an ob die Frage war oder falsch ist
     * 
     * @return mixed[] $response Liefert Erfolgsnachricht als array zurück
     * */

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

    /**
     * Aktuellisierung der Antwort
     * @param int $id übergibt die ID der Frage
     * @param mixed[] $rawdata updated alle erhaltenen informationen aus dem array
     * @return mixed[] $response Liefert Erfolgsnachricht als array zurück
     * @Vorgang BI-012
     * 
     * */
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

   

    /**
     * Antwort löschen
     * @param int $id übergibt die ID der Frage
     * @return mixed[] $response Liefert Erfolgsnachricht als array zurück
     * @Vorgang BI-012
     * 
     * */
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


    /**
     * Antwort auf einzigartigkeit geprüfen
     * @param int $questionID übergibt die ID der Frage
     * @param int $answerID übergibt die ID der Antwort
     * @return mixed[] $data Liefert Erfolgsnachricht als array zurück
     * @Vorgang BI-012
     * 
     * */
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