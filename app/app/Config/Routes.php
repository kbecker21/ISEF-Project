<?php 
namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('login');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */


$routes->get('category/course/(:num)', 'Category::showcourse/$1', ['filter' => 'authuser']);
 // We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->resource('user',['filter' => 'authadmin']);
$routes->resource('subject',['filter' => 'authadmin']);
$routes->resource('category',['filter' => 'authuser']);
$routes->resource('question',['filter' => 'authuser']);
$routes->resource('answer',['filter' => 'authuser']);


$routes->resource('students',['filter' => 'authuser']);
$routes->resource('quiz',['filter' => 'authuser']);
$routes->resource('me',['filter' => 'authuser']);

$routes->post('register', 'Register::index');
$routes->post('login', 'Login::index');


$routes->get('questionsbycourse/(:num)', 'Question::showbycourse/$1', ['filter' => 'authuser']);
$routes->get('flaggedquestionsbycourse/(:num)', 'Question::showbycourse/$1/flagged', ['filter' => 'authuser']);
$routes->get('countflagged/(:num)', 'Question::countFlaggedQuestions/$1', ['filter' => 'authuser']);


$routes->get('getalluser', 'students::getAllUser', ['filter' => 'authuser']);


$routes->get('getplayerhistory', 'Quiz::getPlayerHistory', ['filter' => 'authuser']);

$routes->get('getquestions/(:num)/(:num)', 'Quiz::getQuestions/$1/$2', ['filter' => 'authuser']);

$routes->post('postResult', 'Quiz::postResult', ['filter' => 'authuser']);

$routes->get('getGameByPlayer/(:num)', 'Quiz::getGameByPlayer/$1', ['filter' => 'authuser']);

$routes->get('getRanking', 'Quiz::getRanking', ['filter' => 'authuser']);

$routes->get('getquestionbycreator/(:num)', 'Question::getQuestionByCreator/$1', ['filter' => 'authuser']);

$routes->get('getuser/(:num)', 'students::getUser/$1', ['filter' => 'authuser']);


$routes->get('showanswers/(:num)', 'students::showAnswers/$1', ['filter' => 'authuser']);


$routes->get('answerunique/(:num)/(:num)', 'Answer::checkForUnique/$1/$2', ['filter' => 'authuser']);



/*


$routes->get('me', 'Me::index', ['filter' => 'authuser']);
$routes->post('me/(:num)', 'Me::update/$1', ['filter' => 'authuser']);
$routes->delete('me/(:num)', 'Me::delete/$1', ['filter' => 'authuser']);

$routes->get('user', 'User::index', ['filter' => 'authadmin']);
$routes->post('user', 'User::create', ['filter' => 'authadmin']);
$routes->get('user/(:num)', 'User::show/$1', ['filter' => 'authadmin']);
$routes->post('user/(:num)', 'User::update/$1', ['filter' => 'authadmin']);
$routes->patch('user/(:num)', 'User::update/$1', ['filter' => 'authadmin']);
$routes->delete('user/(:num)', 'User::delete/$1', ['filter' => 'authadmin']);

$routes->get('subject', 'Subject::index', ['filter' => 'authadmin']);
$routes->post('subject', 'Subject::create', ['filter' => 'authadmin']);
$routes->get('subject/(:num)', 'Subject::show/$1', ['filter' => 'authadmin']);
$routes->post('subject/(:num)', 'Subject::update/$1', ['filter' => 'authadmin']);
$routes->delete('subject/(:num)', 'Subject::delete/$1', ['filter' => 'authadmin']);

$routes->get('category', 'Category::index', ['filter' => 'authadmin']);
$routes->post('category', 'Category::create', ['filter' => 'authadmin']);
$routes->get('category/(:num)', 'Category::show/$1', ['filter' => 'authadmin']);
$routes->post('category/(:num)', 'Category::update/$1', ['filter' => 'authadmin']);
$routes->delete('category/(:num)', 'Category::delete/$1', ['filter' => 'authadmin']);

$routes->get('question', 'Question::index', ['filter' => 'authadmin']);
$routes->post('question', 'Question::create', ['filter' => 'authadmin']);
$routes->get('question/(:num)', 'Question::show/$1', ['filter' => 'authadmin']);
$routes->post('question/(:num)', 'Question::update/$1', ['filter' => 'authadmin']);
$routes->delete('question/(:num)', 'Question::delete/$1', ['filter' => 'authadmin']);


*/


/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}

