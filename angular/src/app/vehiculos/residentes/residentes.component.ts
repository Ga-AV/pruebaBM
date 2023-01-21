import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculosService } from '../vehiculos.service';
import { Vehiculos } from '../vehiculos';

@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.css']
})
export class ResidentesComponent implements OnInit{
  vehiculos: Vehiculos[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, public vehiculosService: VehiculosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.vehiculosService.getResidentes().subscribe((data: Vehiculos[])=>{
      this.vehiculos = data;
      console.log(this.vehiculos);
    });

    this.form = new FormGroup({
      placa:  new FormControl('', [ Validators.required,]),
    });

  }

  registerSucess:boolean = false;
  crear(){
    this.vehiculosService.crearVehiculo(this.form.value).subscribe(x => {
      this.registerSucess=true;
      this.form.reset();
      this.ngOnInit();
    });
  }

}
