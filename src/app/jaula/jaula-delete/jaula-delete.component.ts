declare var bootstrap: any;
import { Component, Input } from '@angular/core';
import { JaulaService } from '../../service/jaula.service';
import { Jaula } from '../../models/jaula.model';

@Component({
  selector: 'app-jaula-delete',
  standalone: true,
  imports: [],
  templateUrl: './jaula-delete.component.html',
  styleUrl: './jaula-delete.component.css'
})
export class JaulaDeleteComponent {
  constructor(private service: JaulaService) { }
  @Input() jaula: Jaula = { id: 0, nombre: '', enUso: "N" }; // Valor predeterminado si no se pasa ninguno

  deleteJaula(jaula: Jaula) {
    this.service.deleteProducto(jaula.id).subscribe();
    // Usa la API nativa de Bootstrap 5 para cerrar el modal
    const modalElement = document.getElementById('deleteModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide(); // Cierra el modal
    }
  }
}
