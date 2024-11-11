import { Component } from '@angular/core';
import { Jaula } from '../../models/jaula.model';
import { JaulaService } from '../../service/jaula.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jaula-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jaula-create.component.html',
  styleUrl: './jaula-create.component.css'
})
export class JaulaCreateComponent {
  jaula: Jaula = new Jaula();

  constructor(private service: JaulaService) { }

  createJaula(): void {
    this.jaula.enUso = "N"; //por defecto
    this.service.createJaula(this.jaula).subscribe((response) => {
      console.log('Producto creado:', response);
      // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
      alert('Producto creado exitosamente!');
      this.jaula = new Jaula();
    });
  }
}
