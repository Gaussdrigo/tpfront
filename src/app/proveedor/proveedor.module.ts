import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { FormsModule } from '@angular/forms';
import { ProveedorEditComponent } from './proveedor-edit/proveedor-edit.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    FormsModule,
    ProveedorEditComponent,
  ]
})
export class ProveedorModule { }



