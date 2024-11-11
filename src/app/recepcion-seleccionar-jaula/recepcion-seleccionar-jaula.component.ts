import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JaulaService } from '../service/jaula.service';
import { Jaula } from '../models/jaula.model';

@Component({
  selector: 'app-recepcion-seleccionar-jaula',
  templateUrl: './recepcion-seleccionar-jaula.component.html',
  styleUrls: ['./recepcion-seleccionar-jaula.component.css']
})
export class RecepcionSeleccionarJaulaComponent implements OnInit {
  @Input() recepcionId!: number;
  @Output() jaulaSeleccionada = new EventEmitter<string>();
  @Output() closePopupEvent = new EventEmitter<void>(); // Para cerrar el popup desde el componente padre
  jaulasDisponibles: Jaula[] = [];
  selectedJaula: string = '';

  constructor(private jaulaService: JaulaService) { }

  ngOnInit(): void {
    this.jaulaService.getJaulas().subscribe(jaulas => {
      this.jaulasDisponibles = jaulas.filter(jaula => jaula.enUso === 'N');
      console.log(this.jaulasDisponibles); // Verifica que las jaulas se están cargando correctamente
    });
  }

  seleccionarJaula(jaulaId: string): void {
    this.jaulaSeleccionada.emit(jaulaId);
    this.closePopup(); // Cerrar el popup después de seleccionar la jaula
  }

  closePopup(): void {
    this.closePopupEvent.emit();

  }
}
