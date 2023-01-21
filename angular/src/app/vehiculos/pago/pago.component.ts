import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculosService } from '../vehiculos.service';
import { Vehiculos } from '../vehiculos';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit{
  vehiculos: Vehiculos[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, public vehiculosService: VehiculosService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      nombre:[''],
    });
  }

  ngOnInit(): void {
    this.vehiculosService.getResidentes().subscribe((data: Vehiculos[])=>{
      this.vehiculos = data;
    });}

  registerSucess:boolean = false;


  public openPDF(): void {
    let DATA: any = document.getElementById('tablapdf');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jspdf('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.form.controls['nombre'].value);
      this.registerSucess=true;
    });
  }
}
