<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\CategoryModel;


class Category extends ResourceController
{
    use ResponseTrait;

    // all Categorys
    public function index(){

      $model = new CategoryModel();

      $data['Category'] = $model->orderBy('idCategory', 'DESC')->findAll();
      return $this->respond($data);
    }

    // single Category
    public function show($id = null){

        $model = new CategoryModel();

        $data = $model->find($id);
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Category found');
        }
    }

    // create
    public function create() {

        $model = new CategoryModel();
        $session = session();
        
        $data = [
            'Subject_idSubject'  => $this->request->getVar('subject'),
            'Name' => $this->request->getVar('name'),
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

    // update
    public function update($id = null){

        $model = new CategoryModel();

        $data = [
            'Subject_idSubject'  => $this->request->getVar('subject'),
            'Name' => $this->request->getVar('name'),
            //'Creator_idUser' => 1, //NEED to come from session ID!!!!
            'CreateDate'  => date("Y-m-d H:i:s")
        ];

        $model->update($id, $data);

        $response = [
          'status'   => 200,
          'error'    => null,
          'messages' => [
              'success' => 'Category updated successfully'
          ]
      ];
      return $this->respond($response);
    }

   

    // delete 
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