<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\SubjectModel;


class Subject extends ResourceController {
    use ResponseTrait;

        
    /**
     * Liefert alle Module zurück
     * @param 
     * @return Liefert Name, Creator zurück
     * @Vorgang BI-010
     * 
     * */
    public function index(){
        
      $model = new SubjectModel();

      $data['Subject'] = $model->orderBy('idSubject', 'ASC')->findAll();


      return $this->respond($data);
    }

    /**
     * Liefert ein Module zurück
     * @param 
     * @return Liefert Name, Creator zurück
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
     * Erstellung des Module
     * @param ShortName, name, creator, active und CreateDate
     * @Vorgang BI-010
     * 
     * */
    public function create() {

        $model = new SubjectModel();
        $session = session();
       
        $data = [
            'ShortName'  => $this->request->getVar('ShortName'),
            'Name' => $this->request->getVar('Name'),
            'Creator_idUser' => $session->get('idUser'), 
            'Active'  => $this->request->getVar('Active'),
            'CreateDate'  => date("Y-m-d H:i:s")
        ];

        
        $model->insert($data);

        $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'Subject created successfully'
          ]
      ];
      
      return $this->respondCreated($response);

    }


    /**
     * Aktualisierung des Module
     * @param data array
     * @Vorgang BI-010
     * 
     * */
    public function update($id = null){

        $model = new SubjectModel();

        $rawdata = $this->request->getJSON(true);     
        //var_dump($rawdata);
        $filteredData = remove_empty($rawdata);
        $model->update($id, $filteredData);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Subject updated successfully'
          ]
      ];
      return $this->respond($response);
    }

   
    /**
     * Löschen eines Module
     * @param id subject
     * @Vorgang BI-010
     * 
     * */
    public function delete($id = null){

        $model = new SubjectModel();

        $data = $model->find($id);
        if($data){
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Subject successfully deleted'
                ]
            ];
            return $this->respondDeleted($response);
        }else{
            return $this->failNotFound('No Subject found');
        }
    }

}