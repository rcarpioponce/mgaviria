<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	if(Auth::id()){
		return Redirect::to('/admin');
	}else{
		return View::make('login');
	}
});
Route::get('/logout', function()
{
	Auth::logout();
	return Redirect::to('/');
});

Route::post('/', function()
{
	$email = $_POST['email'];
	$password = $_POST['password'];
	if (Auth::attempt(array('email' => $email, 'password' => $password)))
	{
		return Redirect::to('admin');
	}else{
		return Redirect::to('/');
	}	
});

Route::group(array('before' => 'logueado'), function(){
	Route::get('admin', function()
	{
		if(Auth::id()){
			require('home.html');
		}else{
			Redirect::to('/');
		}
	});
	Route::get('/reporte',array('uses'=>'ReporteController@index'));
	
	Route::get('/banco',array('uses'=>'BancoController@index'));
	Route::post('/banco',array('uses'=>'BancoController@add'));
	Route::put('/banco/{id}',array('uses'=>'BancoController@update'));
	Route::delete('/banco/{id}',array('uses'=>'BancoController@delete'));


	Route::get('/local',array('uses'=>'LocalController@index'));
	Route::post('/local',array('uses'=>'LocalController@add'));
	Route::put('/local/{id}',array('uses'=>'LocalController@update'));
	Route::delete('/local/{id}',array('uses'=>'LocalController@delete'));	

	Route::get('/unidad',array('uses'=>'UnidadController@index'));
	Route::post('/unidad',array('uses'=>'UnidadController@add'));
	Route::put('/unidad/{id}',array('uses'=>'UnidadController@update'));
	Route::delete('/unidad/{id}',array('uses'=>'UnidadController@delete'));


	Route::get('/perfil',array('uses'=>'PerfilController@index'));
	Route::post('/perfil',array('uses'=>'PerfilController@add'));
	Route::put('/perfil/{id}',array('uses'=>'PerfilController@update'));
	Route::delete('/perfil/{id}',array('uses'=>'PerfilController@delete'));


	Route::get('/categoria/all',array('uses'=>'CategoriaController@all'));
	Route::get('/categoria',array('uses'=>'CategoriaController@index'));
	Route::post('/categoria',array('uses'=>'CategoriaController@add'));
	Route::put('/categoria/{id}',array('uses'=>'CategoriaController@update'));
	Route::delete('/categoria/{id}',array('uses'=>'CategoriaController@delete'));

	Route::get('/producto/all',array('uses'=>'ProductoController@all'));
	Route::get('/producto',array('uses'=>'ProductoController@index'));
	Route::post('/producto',array('uses'=>'ProductoController@add'));
	Route::put('/producto/{id}',array('uses'=>'ProductoController@update'));
	Route::delete('/producto/{id}',array('uses'=>'ProductoController@delete'));

	Route::get('/proveedor/all',array('uses'=>'ProveedorController@all'));
	Route::get('/proveedor',array('uses'=>'ProveedorController@index'));
	Route::post('/proveedor',array('uses'=>'ProveedorController@add'));
	Route::put('/proveedor/{id}',array('uses'=>'ProveedorController@update'));
	Route::delete('/proveedor/{id}',array('uses'=>'ProveedorController@delete'));			

	Route::get('/cliente',array('uses'=>'ClienteController@index'));
	Route::post('/cliente',array('uses'=>'ClienteController@add'));
	Route::put('/cliente/{id}',array('uses'=>'ClienteController@update'));
	Route::delete('/cliente/{id}',array('uses'=>'ClienteController@delete'));


	Route::get('/usuario',array('uses'=>'UserController@index'));
	Route::post('/usuario',array('uses'=>'UserController@add'));
	Route::get('/usuario/{id}',array('uses'=>'UserController@find'));
	Route::put('/usuario/{id}',array('uses'=>'UserController@update'));
	Route::delete('/usuario/{id}',array('uses'=>'UserController@delete'));


	Route::get('/requerimiento',array('uses'=>'RequerimientoController@index'));
	Route::post('/requerimiento',array('uses'=>'RequerimientoController@add'));
	Route::get('/requerimiento/{id}',array('uses'=>'RequerimientoController@find'));
	Route::put('/requerimiento/{id}',array('uses'=>'RequerimientoController@update'));
	Route::delete('/requerimiento/{id}',array('uses'=>'RequerimientoController@delete'));

	Route::get('/requerimiento_interno',array('uses'=>'RequerimientoInternoController@index'));
	Route::post('/requerimiento_interno',array('uses'=>'RequerimientoInternoController@add'));
	Route::get('/requerimiento_interno/{id}',array('uses'=>'RequerimientoInternoController@find'));
	Route::put('/requerimiento_interno/{id}',array('uses'=>'RequerimientoInternoController@update'));
	Route::delete('/requerimiento_interno/{id}',array('uses'=>'RequerimientoInternoController@delete'));			
});