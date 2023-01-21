<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Use App\Models\Vehiculos;
Use App\Models\Estancias;
use Illuminate\Support\Facades\DB;
Use Log;
use Carbon\Carbon;
use DateTime;

class VehiculosController extends Controller
{
    public function getAll(){
        $data = Vehiculos::get();
        return response()->json($data, 200);
      }

      public function getResidentes(){
        $res =  DB::table('vehiculos')->where('tipo', 'residente')->get();
        return response()->json($res, 200);
      }


    public function getOficiales(){
        $oficiales = DB::table('vehiculos')->where('tipo', 'oficial')->get();
        return response()->json($oficiales, 200);
      }

      public function getTipo($placa){
        $data = DB::table('vehiculos')->where('placa', $placa)->select('tipo')->get();
        return response()->json($data, 200);
      }

      public function crearVehiculo(Request $request){
        $data['placa'] = $request['placa'];
        $data['tipo'] = "residente";
        $data['entrada'] = "01/01/0001";
        $data['salida'] = "01/01/0001";
        $data['total'] = 0;
        $data['pago'] = 0.00;
        Vehiculos::create($data);
        return response()->json([
            'message' => 'Creado correctamente',
            'success' => true
        ], 200);
      }

      public function crearVehiculoOficial(Request $request){
        $data['placa'] = $request['placa'];
        $data['tipo'] = "oficial";
        $data['entrada'] = "01/01/0001";
        $data['salida'] = "01/01/0001";
        $data['total'] = 0;
        $data['pago'] = 0.00;
        Vehiculos::create($data);
        return response()->json([
            'message' => 'Creado correctamente',
            'success' => true
        ], 200);
      }

      public function registrarEntrada($placa){
        $data['entrada'] = $current = Carbon::now()->setTimezone('CST');
        Vehiculos::where('placa',$placa)->update($data);
        return response()->json([
            'message' => "Registrado correctamente",
            'success' => true
        ], 200);
      }

      public function registrarSalida($placa){
        $data['salida'] = $current = Carbon::now()->setTimezone('CST');
        Vehiculos::where('placa',$placa)->update($data);
        return response()->json([
            'message' => "Registrado correctamente",
            'success' => true
        ], 200);
      }

      public function crearVehiculoNR(Request $request){
        if(DB::table('vehiculos')->where('placa', $request['placa'])->exists()){
            return $this->registrarEntrada($request['placa']);
        } else {
            $data['placa'] = $request['placa'];
            $data['tipo'] = "noresidente";
            $data['entrada'] = $current = Carbon::now()->setTimezone('CST');
            $data['salida'] = "01/01/0001";
            $data['total'] = 0;
            $data['pago'] = 0.00;
            Vehiculos::create($data);
            return response()->json([
                'message' => 'Creado correctamente',
                'success' => true
            ], 200);
        }       
      }

      public function getHoraEntrada($placa){
        $entrada = DB::table('vehiculos')->where('placa', $placa)->select('entrada')->get();
        //$entrada = json_decode( json_encode($entrada), true);
        return $entrada;
      }

      public function registrarDatos($placa){
        $salida = Carbon::now()->setTimezone('CST');
        $entrada = DB::table('vehiculos')->where('placa', $placa)->value('entrada');
        $dif = $salida->diff(Carbon::parse($entrada));
        $minutos = $dif->i;
        $data['salida'] = $salida;
        $total = DB::table('vehiculos')->where('placa', $placa)->value('total');
        $mintotal = $minutos + $total;
        $data['total'] = $mintotal;
        $tipo = DB::table('vehiculos')->where('placa', $placa)->value('tipo');
        if($tipo == 'residente'){
            $data['pago'] = $mintotal * 0.05;
        } else{
            $data['pago'] = $mintotal * 0.5;
        }
        Vehiculos::where('placa',$placa)->update($data);
        return response()->json([
            'message' => "Registrado correctamente",
            'success' => true
        ], 200);
        }

    public function getPago($placa){
        $data = DB::table('vehiculos')->where('placa', $placa)->select('pago')->get();
        return response()->json($data, 200);
    }
    
    public function comienzaMes(){
        $data['total'] = 0;
        $data['pago'] = 0.00;
        Vehiculos::where('tipo','residente')->update($data);
        return response()->json([
            'message' => "Registrado correctamente",
            'success' => true
        ], 200);
      }
}
