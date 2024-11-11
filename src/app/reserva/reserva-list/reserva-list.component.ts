  declare var bootstrap: any;
  import { Component, OnInit } from '@angular/core';
  import { Reserva } from '../../models/reserva.model';
  import { ReservaService } from '../../service/reserva.service';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { ReservaCreateComponent } from '../reserva-create/reserva-create.component';
  //import { ReservaEditComponent } from '../reserva-edit/reserva-edit.component';
  //import { ReservaDeleteComponent } from '../reserva-delete/reserva-delete.component';

  @Component({
    selector: 'app-reserva-list',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      ReservaCreateComponent,
      //ReservaEditComponent/,
      //ReservaDeleteComponent
    ],
    templateUrl: './reserva-list.component.html',
    styleUrls: ['./reserva-list.component.css'],
  })
  export class ReservaListComponent implements OnInit {
    reservas: Reserva[] = [];
    filteredReservas: Reserva[] = [];
    searchTerm: string = '';
    // Inicialización de reservaSeleccionada
    reservaSeleccionada: Reserva = {
      id:0,
      cabecera: {
        id: 0,
        fecha: '',
        horaInicioAgendamiento: '',
        horaFinAgendamiento: '',
        idProveedor: 0,
        idJaula: 0,
        horaInicioRecepcion: '',
        horaFinRecepcion: ''
      },
      detalles: []
    };
    constructor(private reservaService: ReservaService) { }

    ngOnInit(): void {
      this.getReservas();
      this.reservaService.reservas$.subscribe(reservas => {
        this.reservas = reservas;
        this.filteredReservas = reservas;
      });
    }

    getReservas() {
      this.reservaService.getReservas().subscribe({
        next: (response) => {
          console.log('Datos recibidos:', response);
          this.reservas = response || [];
          // Verifica que cada reserva tenga cabecera antes de asignarlas
          this.reservas = this.reservas.map(reserva => ({
            id: reserva.id,
            cabecera: reserva.cabecera || {}, // Inicializa cabecera si no existe
            detalles: reserva.detalles || []
          }));
          this.filteredReservas = [...this.reservas];
        },
        error: (err) => {
          console.error('Error al obtener reservas:', err);
          alert('Hubo un error al listar las reservas.');
        }
      });
    }
    

    filterReservas() {
      this.filteredReservas = this.reservas.filter(reserva =>
        reserva.cabecera.fecha.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reserva.cabecera.idProveedor.toString().includes(this.searchTerm) ||
        reserva.cabecera.idJaula.toString().includes(this.searchTerm)
      );
    }

    createReserva() {
      const modalElement = document.getElementById('staticBackdrop');
      console.log(modalElement);
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal element not found');
      }
    }

    // no implementado
    deleteReserva(reserva: Reserva) {
      this.reservaSeleccionada = { ...reserva };
      const modal = new bootstrap.Modal(document.getElementById('deleteReservaModal'));
      modal.show();
    }

    editReserva(reserva: Reserva) {
      this.reservaSeleccionada = { ...reserva };
      const modal = new bootstrap.Modal(document.getElementById('editReservaModal'));
      modal.show();
    }
  }
