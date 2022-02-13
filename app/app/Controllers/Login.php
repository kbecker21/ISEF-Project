<?php namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use \Firebase\JWT\JWT;
 
class Login extends ResourceController {
    use ResponseTrait;
     

    /**
     * Anmeldung beim Server
     * 
     * @Input Daten aus Get-Request
     * 
     * @return mixed[] $response Liefert einen array mit der erfolgsnachricht und User daten
     * @Vorgang BI-003
     * 
     * */ 
    public function index() {
        $userModel = new UserModel();
  
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');
          
        $user = $userModel->where('Email', $email)->first();
  
        if(is_null($user)) {
            return $this->respond(['error' => 'Invalid username or password.'], 401);
        }
  
        $pwd_verify = password_verify($password, $user['Password']);
  
        if(!$pwd_verify) {
            return $this->respond(['error' => 'Invalid username or password.'], 401);
        }
 
        $key = getenv('JWT_SECRET');
        $iat = time(); // current timestamp value
        $exp = $iat + 3600;
 
        $payload = array(
            "iss" => "Issuer of the JWT",
            "aud" => "Audience that the JWT",
            "sub" => "Subject of the JWT",
            "iat" => $iat, //Time the JWT issued at
            "exp" => $exp, // Expiration time of token
            "email" => $user['Email'],
            "idUser" => $user['idUser'],
            'AccountLevel'=> $user['AccountLevel_idAccountLevel'],
        );
         
        $token = JWT::encode($payload, $key);
 
        $response = [
            'message' => 'Login Succesful',
            'token' => $token,
            'Userdata' => [
              'idUser' => $user['idUser'],
              'FirstName' => $user['FirstName'],
              'LastName' => $user['LastName'],
              'Email' => $user['Email'],
              'AccountLevel_idAccountLevel' => $user['AccountLevel_idAccountLevel'],    
          ]
        ];
         
        return $this->respond($response, 200);
    }
 
}