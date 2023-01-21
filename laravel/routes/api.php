<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\VehiculosController;

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
Route::prefix('vehiculos')->group(function () {
    Route::get('/',[ VehiculosController::class, 'getAll']);
    Route::get('/getResidentes',[ VehiculosController::class, 'getResidentes']);
    Route::get('/getOficiales',[ VehiculosController::class, 'getOficiales']);
    Route::get('/getTipo/{id}',[ VehiculosController::class, 'getTipo']);
    Route::post('/crearVehiculo',[ VehiculosController::class, 'crearVehiculo']);
    Route::post('/crearVehiculoOficial',[ VehiculosController::class, 'crearVehiculoOficial']);
    Route::post('/crearVehiculoNR',[ VehiculosController::class, 'crearVehiculoNR']);
    Route::get('/getHoraEntrada',[ VehiculosController::class, 'getHoraEntrada']);
    Route::put('/registrarEntrada/{placa}',[ VehiculosController::class, 'registrarEntrada']);
    Route::put('/registrarSalida/{placa}',[ VehiculosController::class, 'registrarSalida']);
    Route::put('/registrarDatos/{placa}',[ VehiculosController::class, 'registrarDatos']);
    Route::get('/getPago/{placa}',[ VehiculosController::class, 'getPago']);
    Route::put('/comienzaMes',[ VehiculosController::class, 'comienzaMes']);   
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
