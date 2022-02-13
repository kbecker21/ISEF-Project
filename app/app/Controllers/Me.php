<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use Firebase\JWT\JWT;
 
class Me extends ResourceController {

    /**
     * Benutzerinformation von der Angemeldeten Person
     * @return mixed[] $data Liefert einen array mit allen user information von der angemeldeten person
     * @Vorgang BI-004
     * 
     * */ 
    use ResponseTrait;
    public function index() {
        
      $model = new UserModel();
      $session = session();

      $data = $model->find($session->get('idUser'));

      return $this->respond($data);

    }

    /**
     * Benutzerinformation von der Angemeldeten Person updaten
     * @param int $id übergibt die ID des Unsers
     * 
     * @Input Daten aus Get-Request
     * 
     * @return mixed[] $response Liefert einen array mit der erfolgsnachricht
     * @Vorgang BI-004
     * 
     * */ 
    public function update($id = null){

        $model = new UserModel();
        $session = session();
        
        $rawdata = $this->request->getRawInput();

        $model->update($session->get('idUser'), $rawdata);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Information updated successfully'
          ]
      ];
      return $this->respond($response);
    }

   
    /**
     * Löscht account von der angemeldeten Person
     * @param int $id übergibt die ID des Unsers
     * 
     * @return mixed[] $response Liefert einen array mit der erfolgsnachricht
     * @Vorgang BI-004
     * 
     * */ 
    public function delete($id = null){

        $model = new UserModel();
        $session = session();

            $model->delete($session->get('idUser'));
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Account successfully deleted'
                ]
            ];
            return $this->respondDeleted($response);

    }
}
