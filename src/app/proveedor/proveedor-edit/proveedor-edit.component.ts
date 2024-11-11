declare var bootstrap: any;
import { Component, Input } from '@angular/core';
import { Proveedor } from '../../models/proveedor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-proveedor-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.css']
})
export class ProveedorEditComponent {

  constructor(private proveedorService: ProveedorService) { }

  @Input() proveedor: Proveedor = { id: 0, nombre: '' }; // Valor predeterminado si no se pasa ninguno

  updateProveedor(proveedor: Proveedor) {
    this.proveedorService.updateProveedor(proveedor).subscribe();
    // Usa la API nativa de Bootstrap 5 para cerrar el modal
    const modalElement = document.getElementById('myModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide(); // Cierra el modal
    }
  }
}

