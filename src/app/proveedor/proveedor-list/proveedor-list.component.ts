declare var bootstrap: any;
import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorService } from '../../service/proveedor.service';
import { CommonModule } from '@angular/common';
import { ProveedorEditComponent } from "../proveedor-edit/proveedor-edit.component";
import { ProveedorDeleteComponent } from '../proveedor-delete/proveedor-delete.component';
import { ProveedorCreateComponent } from "../proveedor-create/proveedor-create.component";
import { debounceTime, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-proveedor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProveedorEditComponent, ProveedorDeleteComponent, ProveedorCreateComponent],
  templateUrl: './proveedor-list.component.html',
  styleUrl: './proveedor-list.component.css',
})

export class ProveedorListComponent implements OnInit {
  proveedores: Proveedor[] = [];
  searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject<string>();
  constructor(private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.getProveedores();
    this.proveedorService.proveedores$.subscribe(proveedores => {
      this.proveedores = proveedores;
      console.log('Proveedores actualizados:', proveedores);
    });
  }
  getProveedores() {
    this.proveedorService.getProveedores().subscribe({
      next: (response) => {
        this.proveedores = response;
        console.log('Proveedores:', this.proveedores);
      },
      error: (err) => {
        console.error('Error al obtener proveedores:', err);
        alert('Hubo un error al listar los proveedores.');
      }
    });
  }

  createProveedor() {
    const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show(); // Abre el modal
  }
  proveedorSeleccionado: Proveedor = { id: 0, nombre: '' }; // por defecto
  deleteProveedor(proveedor: Proveedor) {
    this.proveedorSeleccionado = { ...proveedor }; // Clona el proveedor para editarlo
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show(); // Abre el modal
  }
  editProveedor(proveedor: Proveedor) {
    this.proveedorSeleccionado = { ...proveedor }; // Clona el proveedor para editarlo
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show(); // Abre el modal
  }
  onSearchChange(searchTerm: string): void {
    if (searchTerm) {
      this.proveedorService.getProveedoresByName(searchTerm).subscribe(proveedores => {
        this.proveedores = proveedores;
      });
    } else {
      this.getProveedores(); // Si no hay término de búsqueda, carga todos los proveedores
    }
  }
  

}

