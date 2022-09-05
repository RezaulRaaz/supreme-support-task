<?php

use App\Http\Controllers\FrontendDataController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('data_list',[FrontendDataController::class,'get_location_data']);
Route::get('single_location_data/{id}',[FrontendDataController::class,'single_location_data']);
Route::post('data/store',[FrontendDataController::class,'store']);
Route::post('data/update',[FrontendDataController::class,'update']);
Route::get('data/delete/{id}',[FrontendDataController::class,'delete']);
Route::post('data/location/distance',[FrontendDataController::class,'distance']);

