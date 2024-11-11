import { Component, EventEmitter, Output } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../service/producto.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-producto-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto-create.component.html',
  styleUrl: './producto-create.component.css'
})
export class ProductoCreateComponent {
  producto: Producto = new Producto();

  constructor(private productoService: ProductoService) { }

  createProducto(): void {
    this.productoService.createProducto(this.producto).subscribe((response) => {
      console.log('Producto creado:', response);
      // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
      alert('Producto creado exitosamente!');
      this.producto = new Producto();
    });
  }
}
