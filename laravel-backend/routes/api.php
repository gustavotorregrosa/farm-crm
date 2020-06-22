<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/usuario/login', 'Auth\LoginController@loginComSenha');
Route::post('/usuario/registrar', 'Auth\RegisterController@registrarUsuario');

Route::get('/culturas/listar', 'CulturasController@index');
Route::post('/culturas/salvar', 'CulturasController@store');
Route::post('/culturas/editar', 'CulturasController@update');
Route::delete('/culturas/deletar/{id}', 'CulturasController@delete');

Route::get('/estados/listar', 'EstadosController@index');

Route::get('/cidades/listar/{estado?}', 'CidadesController@index');

Route::get('/produtores/listar', 'ProdutoresController@index');
Route::post('/produtores/salvar', 'ProdutoresController@save');
Route::delete('/produtores/deletar/{id}', 'ProdutoresController@delete');
