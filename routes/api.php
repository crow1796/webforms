<?php

use Illuminate\Http\Request;

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

Route::group(['prefix' => '/v1', 'namespace' => 'Api\V1'], function(){

	Route::group(['prefix' => '/workspaces'], function(){

		Route::get('all', 'WorkspaceController@all');
		Route::post('create', 'WorkspaceController@create');
		Route::post('{workspace}/delete', 'WorkspaceController@delete');
	});

	Route::post('register', 'Auth\RegisterController@register');
	Route::post('login',  'Auth\LoginController@login');

    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::get('me',  'Auth\LoginController@getUser');
    });
});