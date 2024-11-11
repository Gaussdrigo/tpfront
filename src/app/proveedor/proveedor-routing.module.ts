import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorCreateComponent } from './proveedor-create/proveedor-create.component';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { PagesContainerComponent } from './pages-container/pages-container.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PagesContainerComponent,
    children: [
      { path: "list", component: ProveedorListComponent },
      { path: "create", component: ProveedorCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
