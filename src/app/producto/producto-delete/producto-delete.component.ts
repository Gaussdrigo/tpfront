declare var bootstrap: any;
import { Component, Input } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-producto-delete',
  standalone: true,
  imports: [],
  templateUrl: './producto-delete.component.html',
  styleUrl: './producto-delete.component.css'
})
export class ProductoDeleteComponent {
  constructor(private productoService: ProductoService) { }
  @Input() producto: Producto = { id: 0, nombre: '' }; // Valor predeterminado si no se pasa ninguno

  deleteProducto(producto: Producto) {
    this.productoService.deleteProducto(producto.id).subscribe();
    // Usa la API nativa de Bootstrap 5 para cerrar el modal
    const modalElement = document.getElementById('deleteModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide(); // Cierra el modal
    }
  }
}
