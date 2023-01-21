import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { BaseComponent } from './base/base.component';
import { EntradaComponent } from './entrada/entrada.component';
import { SalidaComponent } from './salida/salida.component';
import { ResidentesComponent } from './residentes/residentes.component';
import { OficialComponent } from './oficial/oficial.component';
import { MesComponent } from './mes/mes.component';
import { PagoComponent } from './pago/pago.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BaseComponent,
    EntradaComponent,
    SalidaComponent,
    ResidentesComponent,
    OficialComponent,
    MesComponent,
    PagoComponent
  ],
  exports: [BaseComponent],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VehiculosModule { }
