<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('projects', ['uses' => 'ProjectController@showAllProjects']);

    $router->get('projects/{id}', ['uses' => 'ProjectController@showOneProject']);

    $router->post('projects', ['uses' => 'ProjectController@create']);

    $router->delete('projects/{id}', ['uses' => 'ProjectController@delete']);

    $router->put('projects/{id}', ['uses' => 'ProjectController@update']);
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('clients', ['uses' => 'ClientController@showAllClients']);

    $router->get('clients/{id}', ['uses' => 'ClientController@showOneClient']);

    $router->post('clients', ['uses' => 'ClientController@create']);

    $router->delete('clients/{id}', ['uses' => 'ClientController@delete']);

    $router->put('clients/{id}', ['uses' => 'ClientController@update']);
});
