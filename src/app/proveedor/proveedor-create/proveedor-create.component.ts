import { Component } from '@angular/core';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorService } from '../../service/proveedor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor-create',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './proveedor-create.component.html',
  styleUrls: ['./proveedor-create.component.css']  // Asegúrate de que la ruta sea correcta
})
export class ProveedorCreateComponent {
  proveedor: Proveedor = new Proveedor();

  constructor(private proveedorService: ProveedorService) { }

  createProveedor(): void {
    this.proveedorService.addProveedor(this.proveedor).subscribe((response) => {
      console.log('Proveedor creado:', response);
      alert('Proveedor creado exitosamente!');
      this.proveedor = new Proveedor();  // Resetea el formulario
    });
  }
}




