declare var bootstrap: any;
import { Component, Input } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../service/producto.service';


@Component({
  selector: 'app-producto-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent {

  constructor(private productoService: ProductoService) { }
  @Input() producto: Producto = { id: 0, nombre: '' }; // Valor predeterminado si no se pasa ninguno

  updateProducto(producto: Producto) {
    this.productoService.updateProducto(producto).subscribe();
    // Usa la API nativa de Bootstrap 5 para cerrar el modal
    const modalElement = document.getElementById('myModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide(); // Cierra el modal
    }
  }
}
