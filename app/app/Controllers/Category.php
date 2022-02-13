<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\CategoryModel;


class Category extends ResourceController
{
    use ResponseTrait;


    /**
     * Rückgabe aller Kategorien
     * @return mixed[] $data Liefert einen array mit allen categorien und attributen zurück
     * @Vorgang BI-010
     * 
     * */
    public function index(){

      $model = new CategoryModel();

      $data['Category'] = $model->orderBy('idCategory', 'DESC')->findAll();
      return $this->respond($data);
    }

    /**
     * Rückgabe einer Kategorie
     * @param int $id übergibt die ID der Kategorie
     * @return mixed[] $data Liefert einen array mit einer categorien und attributen zurück
     * @Vorgang BI-010
     * 
     * */
    public function show($id = null){

        $model = new CategoryModel();

        $data = $model->find($id);
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Category found');
        }
    }


    /**
     * Rückgabe aller Kategorien von einem Kurs
     * @param int $id übergibt die ID des Modules
     * @return mixed[] $data Liefert einen array mit einer categorien und attributen zurück
     * @Vorgang BI-010
     * 
     * */
    public function showcourse($id = null){

        $model = new CategoryModel();

        $data['Category'] = $model->where('Subject_idSubject', $id)->findAll();
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Category found');
        }
    }

    /**
     * Erstellung einer Kategorien
     * 
     * @Input Daten aus Get-Request
     * 
     * @return mixed[] $response Liefert einen array mit der erfolgsnachricht
     * @Vorgang BI-010
     * 
     * */
    public function create() {

        $model = new CategoryModel();
        $session = session();
        
        $data = [
            'Subject_idSubject'  => $this->request->getVar('Subject_idSubject'),
            'Name' => $this->request->getVar('Name'),
            'Creator_idUser' => $session->get('idUser'), //NEED to come from session ID!!!!
            'CreateDate'  => date("Y-m-d H:i:s")
        ];

        $model->insert($data);

        $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'Category created successfully'
          ]
      ];
      
      return $this->respondCreated($response);

    }

    /**
     * Aktuellisierung einer Kategorien
     * @param int $id übergibt die ID der Kategorie
     * @Input Daten aus Get-Request
     * 
     * @return mixed[] $response Liefert einen array mit der erfolgsnachricht
     * @Vorgang BI-010
     * 
     * */
    public function update($id = null){
        $model = new CategoryModel();

        $rawdata = $this->request->getJSON(true);     
        //var_dump($rawdata);
        $filteredData = remove_empty($rawdata);
        $model->update($id, $filteredData);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Category updated successfully'
          ]
      ];
      return $this->respond($response);
    }

   
    /**
     * Löschen einer Kategorien
     * @param int $id übergibt die ID der Kategorie
     * @return mixed[] $response Liefert einen array mit der erfolgsnachricht
     * @Vorgang BI-010
     * 
     * */
    public function delete($id = null){

        $model = new CategoryModel();

        $data = $model->find($id);
        if($data){
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Category successfully deleted'
                ]
            ];
            return $this->respondDeleted($response);
        }else{
            return $this->failNotFound('No Category found');
        }
    }

}