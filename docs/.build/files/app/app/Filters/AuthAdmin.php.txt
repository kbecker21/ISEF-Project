<?php namespace App\Filters;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\API\ResponseTrait;
use \Firebase\JWT\JWT;

 
class AuthAdmin implements FilterInterface {
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    


    public function before(RequestInterface $request, $arguments = null) {

        $key = getenv('JWT_SECRET');
        $header = $request->getHeader("Authorization");
        $token = null;
 
        // extract the token from the header
        if(!empty($header)) {
            if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
                $token = $matches[1];
            }
        }
 
        // check if token is null or empty
        if(is_null($token) || empty($token)) {
            $response = service('response');
            $response->setBody('Access denied');
            $response->setStatusCode(401);
            return $response;
        }
 
        try {
            $decoded = JWT::decode($token, $key, array("HS256"));
            
            if ($decoded->AccountLevel == "3" ) {
                $response = service('response');
                $response->setBody('Access denied');
                $response->setStatusCode(401);
                return $response;
            }else{
                $session = session();
                $session->set('idUser', $decoded->idUser);
            }

        } catch (Exception $ex) {
            $response = service('response');
            $response->setBody('Access denied');
            $response->setStatusCode(401);
            return $response;
        }
    }
 
    /**
     * Allows After filters to inspect and modify the response
     * object as needed. This method does not allow any way
     * to stop execution of other after filters, short of
     * throwing an Exception or Error.
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @param array|null        $arguments
     *
     * @return mixed
     */
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {
        $session = session();
        $session->destroy();
    }
}
