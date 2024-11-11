import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { FormsModule } from '@angular/forms';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    FormsModule,
    ProductoEditComponent,
  ]
})
export class ProductoModule { }
