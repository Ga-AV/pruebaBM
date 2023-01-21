import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculosService } from '../vehiculos.service';
import { Vehiculos } from '../vehiculos';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit{
  form: FormGroup;
  vehiculos: Vehiculos;
  tipo: string;

  constructor(private fb: FormBuilder, public vehiculosService: VehiculosService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      placa:[''],
  })}

  ngOnInit(): void {
  }
  registerSucess:boolean = false;

  registrar(){
    this.vehiculosService.registrarEntrada(this.form.controls['placa'].value).subscribe(res => {
    this.registerSucess=true;
    this.form.reset();
    this.ngOnInit();
 });
  }
  crearNR(){
    this.vehiculosService.crearVehiculoNR(this.form.value).subscribe(x => {
      this.registerSucess=true;
      this.form.reset();
      this.ngOnInit();
    });
  }

  registrarEntrada(){
    this.crearNR();
  }

  grabar(){
    this.vehiculosService.getTipo(this.form.controls['placa'].value).subscribe((data: Vehiculos)=> {
      this.vehiculos = data;
      this.tipo = this.vehiculos[0].tipo.toString();
      console.log(this.vehiculos[0].tipo);
      //alert(this.vehiculos[0].tipo.toString());
      if((this.tipo == 'residente') || (this.tipo == 'oficial')){
        this.registrar();
      } else {
        this.crearNR();
      }
    });
  }

}
