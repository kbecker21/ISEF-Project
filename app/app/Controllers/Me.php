<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use Firebase\JWT\JWT;
 
class Me extends ResourceController {

    /**
     * Benutzerinformation von der Angemeldeten Person
     * @param 
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

    // update
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

   

    // delete 
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
