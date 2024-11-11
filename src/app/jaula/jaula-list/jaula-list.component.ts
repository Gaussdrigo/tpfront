declare var bootstrap: any;
import { Component, OnInit } from '@angular/core';
import { Jaula } from '../../models/jaula.model';
import { JaulaService } from '../../service/jaula.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JaulaEditComponent } from "../jaula-edit/jaula-edit.component";
import { JaulaCreateComponent } from "../jaula-create/jaula-create.component";
import { JaulaDeleteComponent } from "../jaula-delete/jaula-delete.component";

@Component({
  selector: 'app-jaula-list',
  standalone: true,
  imports: [FormsModule, CommonModule, JaulaEditComponent, JaulaCreateComponent, JaulaDeleteComponent],
  templateUrl: './jaula-list.component.html',
  styleUrl: './jaula-list.component.css'
})
export class JaulaListComponent implements OnInit {

  jaulas: Jaula[] = [];
  filteredJaulas: Jaula[] = [];
  searchTerm: string = '';

  constructor(private service: JaulaService) { }

  ngOnInit(): void {
    this.getJaulas();
    this.service.jaulas$.subscribe(jaulas => {
      this.jaulas = jaulas;
      this.filteredJaulas = jaulas;
    });
  }

  getJaulas() {
    this.service.getJaulas().subscribe({
      next: (response) => {
        this.jaulas = response;
        this.filteredJaulas = response;
      },
      error: () => {
        alert('Hubo un error al listar los productos.');
      }
    });
  }

  filterJaulas() {
    this.filteredJaulas = this.jaulas.filter(jaula =>
      jaula.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createJaula() {
    const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
  }

  jaulaSeleccionada: Jaula = { id: 0, nombre: '', enUso: "N" };

  deleteJaula(jaula: Jaula) {
    this.jaulaSeleccionada = { ...jaula };
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }

  editJaula(jaula: Jaula) {
    this.jaulaSeleccionada = { ...jaula };
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  }
}
