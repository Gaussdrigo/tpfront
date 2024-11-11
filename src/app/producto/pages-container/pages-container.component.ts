import { Component } from '@angular/core';
import { ProductoCreateComponent } from "../producto-create/producto-create.component";
import { ProductoListComponent } from "../producto-list/producto-list.component";



@Component({
  selector: 'app-pages-container',
  standalone: true,
  imports: [ProductoCreateComponent, ProductoListComponent],
  templateUrl: './pages-container.component.html',
  styleUrl: './pages-container.component.css'
})
export class PagesContainerComponent {

}
