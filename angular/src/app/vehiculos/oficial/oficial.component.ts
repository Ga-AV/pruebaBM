import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculosService } from '../vehiculos.service';
import { Vehiculos } from '../vehiculos';

@Component({
  selector: 'app-oficial',
  templateUrl: './oficial.component.html',
  styleUrls: ['./oficial.component.css']
})

export class OficialComponent {

  vehiculos: Vehiculos[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, public vehiculosService: VehiculosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.vehiculosService.getOficiales().subscribe((data: Vehiculos[])=>{
      this.vehiculos = data;
      console.log(this.vehiculos);
    });

    this.form = new FormGroup({
      placa:  new FormControl('', [ Validators.required,]),
    });

  }

  registerSucess:boolean = false;
  crear(){
    this.vehiculosService.crearVehiculoOficial(this.form.value).subscribe(x => {
      this.registerSucess=true;
      this.form.reset();
      this.ngOnInit();
    });
    
  }
}
