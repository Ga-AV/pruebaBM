import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VehiculosService } from '../vehiculos.service';
import { Vehiculos } from '../vehiculos';

@Component({
  selector: 'app-mes',
  templateUrl: './mes.component.html',
  styleUrls: ['./mes.component.css']
})
export class MesComponent {
  form: FormGroup;
  vehiculos: Vehiculos;
  tipo: string;

  constructor(private fb: FormBuilder, public vehiculosService: VehiculosService) {
    this.form = this.fb.group({
  });
  }

  registerSucess:boolean = false;

  comienzaMes(){
    this.vehiculosService.comienzaMes().subscribe(res => {
    this.registerSucess=true;
    this.form.reset();
 });
  }

}
