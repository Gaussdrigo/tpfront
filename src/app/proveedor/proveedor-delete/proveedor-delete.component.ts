declare var bootstrap: any;
import { Component, Input } from '@angular/core';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-proveedor-delete',
  standalone: true,
  imports: [
  ],
  templateUrl: './proveedor-delete.component.html',
  styleUrls: ['./proveedor-delete.component.css']
})
export class ProveedorDeleteComponent {
  @Input() proveedor!: Proveedor;

  constructor(private proveedorService: ProveedorService) {}

  deleteProveedor(proveedor: Proveedor) {
    this.proveedorService.deleteProveedor(proveedor.id).subscribe(() => {
      console.log('Proveedor eliminado:', proveedor);
      const modalElement = document.getElementById('deleteModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide(); // Cierra el modal
      }
      // Aquí podrías refrescar la lista de proveedores o redirigir al usuario
    });
  }
}

