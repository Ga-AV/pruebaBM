import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { EntradaComponent } from './entrada/entrada.component';
import { SalidaComponent } from './salida/salida.component';
import { ResidentesComponent } from './residentes/residentes.component';
import { OficialComponent } from './oficial/oficial.component';
import { MesComponent } from './mes/mes.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
  { path: '', redirectTo: 'vehiculos/entrada', pathMatch: 'full'},
  { path: 'vehiculos/entrada', component: EntradaComponent },
  { path: 'vehiculos/salida', component: SalidaComponent },
  { path: 'vehiculos/oficial', component: OficialComponent },
  { path: 'vehiculos/residentes', component: ResidentesComponent },
  { path: 'vehiculos/pago', component: PagoComponent },
  { path: 'vehiculos/mes', component: MesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
