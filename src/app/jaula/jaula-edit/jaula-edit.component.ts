declare var bootstrap: any;
import { Component, Input } from '@angular/core';
import { Jaula } from '../../models/jaula.model';
import { JaulaService } from '../../service/jaula.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jaula-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jaula-edit.component.html',
  styleUrl: './jaula-edit.component.css'
})
export class JaulaEditComponent {
  constructor(private service: JaulaService) { }
  @Input() jaula: Jaula = { id: 0, nombre: '', enUso: "N" }; // Valor predeterminado si no se pasa ninguno

  updateJaula(jaula: Jaula) {
    this.service.updateJaula(jaula).subscribe();
    // Usa la API nativa de Bootstrap 5 para cerrar el modal
    const modalElement = document.getElementById('myModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide(); // Cierra el modal
    }
  }
}
