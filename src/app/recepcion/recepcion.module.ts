import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecepcionListComponent } from './recepcion-list/recepcion-list.component';
import { RecepcionRoutingModule } from './recepcion-routing.module';
import { FormsModule } from '@angular/forms';
import { RecepcionSeleccionarJaulaComponent } from '../recepcion-seleccionar-jaula/recepcion-seleccionar-jaula.component';

@NgModule({
  declarations: [
    RecepcionListComponent,
    RecepcionSeleccionarJaulaComponent
  ],
  imports: [
    CommonModule,
    RecepcionRoutingModule,
    FormsModule
  ]
})
export class RecepcionModule { }
