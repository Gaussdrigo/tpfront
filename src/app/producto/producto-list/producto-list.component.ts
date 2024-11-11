declare var bootstrap: any;

import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../service/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule aquí
import { ProductoEditComponent } from '../producto-edit/producto-edit.component';
import { ProductoDeleteComponent } from '../producto-delete/producto-delete.component';
import { ProductoCreateComponent } from '../producto-create/producto-create.component';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductoEditComponent,
    ProductoDeleteComponent,
    ProductoCreateComponent
  ],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css'], // Corrige styleUrl a styleUrls
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  filteredProductos: Producto[] = [];
  searchTerm: string = '';

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
    this.productoService.productos$.subscribe(productos => {
      this.productos = productos;
      this.filteredProductos = productos;
    });
  }

  getProductos() {
    this.productoService.getProductos().subscribe({
      next: (response) => {
        this.productos = response;
        this.filteredProductos = response;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        alert('Hubo un error al listar los productos.');
      }
    });
  }

  filterProductos() {
    this.filteredProductos = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createProducto() {
    const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
  }

  productoSeleccionado: Producto = { id: 0, nombre: '' };

  deleteProducto(producto: Producto) {
    this.productoSeleccionado = { ...producto };
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }

  editProducto(producto: Producto) {
    this.productoSeleccionado = { ...producto };
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  }
}


