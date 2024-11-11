import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaListComponent } from './reserva-list/reserva-list.component';
import { ReservaCreateComponent } from './reserva-create/reserva-create.component';
import { ReservaEditComponent } from './reserva-edit/reserva-edit.component';
//import { ReservaDeleteComponent } from './reserva-delete/reserva-delete.component';

const routes: Routes = [
  {
    path: '',
    component: ReservaListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
