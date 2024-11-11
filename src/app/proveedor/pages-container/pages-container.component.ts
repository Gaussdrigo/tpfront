import { Component } from '@angular/core';
import { ProveedorCreateComponent } from "../proveedor-create/proveedor-create.component";
import { ProveedorListComponent } from "../proveedor-list/proveedor-list.component";

@Component({
  selector: 'app-pages-container',
  standalone: true,
  imports: [ProveedorCreateComponent, ProveedorListComponent],
  templateUrl: './pages-container.component.html',
  styleUrl: './pages-container.component.css'
})
export class PagesContainerComponent {

}

