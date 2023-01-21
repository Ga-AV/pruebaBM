import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculosService } from '../vehiculos.service';
import { Vehiculos } from '../vehiculos';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit{
  form: FormGroup;
  vehiculos: Vehiculos;
  vehiculosg: Vehiculos;
  tipo: string;
  pago: string;

  constructor(private fb: FormBuilder, public vehiculosService: VehiculosService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      placa:[''],
  })}

  ngOnInit(): void {
  }
  registerSucess:boolean = false;
  alertapago:boolean = false;

  registrar(){
    this.vehiculosService.registrarSalida(this.form.controls['placa'].value).subscribe(res => {
    this.registerSucess=true;
    this.form.reset();
    this.ngOnInit();
 });}

  registrarDatos(){
    this.vehiculosService.registrarDatos(this.form.controls['placa'].value).subscribe(res => {
      this.registerSucess=true;
   });
  }

  getPago(){
    this.vehiculosService.getPago(this.form.controls['placa'].value).subscribe((data: Vehiculos)=> {
      this.vehiculosg = data;
      this.pago = this.vehiculosg[0].pago.toString();
      this.alertapago=true;
      this.form.reset();
    });
  }

  registrarSalida(){
    this.vehiculosService.getTipo(this.form.controls['placa'].value).subscribe((data: Vehiculos)=> {
      this.vehiculos = data;
      this.tipo = this.vehiculos[0].tipo.toString();
      console.log(this.vehiculos[0].tipo);
      if(this.tipo == 'residente') {
        this.registrarDatos();
        this.form.reset();
      } else if ((this.tipo == 'noresidente')){
        this.registrarDatos();
        setTimeout(()=>{                        
          this.getPago();
      }, 1000);
        
      }else {
        this.registrar();
      }
    });
  }
}
