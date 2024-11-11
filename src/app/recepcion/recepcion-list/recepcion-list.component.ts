import { Component, OnInit } from '@angular/core';
import { RecepcionService } from '../../service/recepcion.service';
import { JaulaService } from '../../service/jaula.service';
import { ProductoService } from '../../service/producto.service'; // Servicio para los productos
import { Recepcion } from '../../models/recepcion.model';
import { Jaula } from '../../models/jaula.model';
import { Producto } from '../../models/producto.model'; // Modelo de Producto
import { Reserva } from '../../models/reserva.model';  // Modelo de Reserva

@Component({
  selector: 'app-recepcion-list',
  templateUrl: './recepcion-list.component.html',
  styleUrls: ['./recepcion-list.component.css']
})
export class RecepcionListComponent implements OnInit {
  recepciones: Recepcion[] = [];
  productos: Producto[] = []; // Lista de productos
  reservas: Reserva[] = [];  // Lista de reservas, la propiedad que faltaba
  filteredRecepciones: Recepcion[] = [];
  searchTerm: string = '';
  filterDate: string = '';
  mostrarPopup: boolean = false;
  mostrarDetalles: boolean = false; // Controlar el modal de detalles
  recepcionSeleccionadaId!: number;
  selectedDate: string = '';
  productosDetalles: { nombre: string; cantidad: number }[] = [];
  // Detalles de productos

  constructor(
    private recepcionService: RecepcionService,
    private jaulaService: JaulaService,
    private productoService: ProductoService // Inyecta el servicio de productos
  ) { }

  ngOnInit(): void {
    this.getRecepciones();
    this.getProductos(); // Cargar los productos al iniciar
  }

  getRecepciones(): void {
    this.recepcionService.getRecepciones().subscribe(recepciones => {
      // Ordenar las recepciones por horaInicioAgendamiento
      this.recepciones = recepciones.sort((a, b) => {
        const timeA = this.convertToDate(a.horaInicioAgendamiento);
        const timeB = this.convertToDate(b.horaInicioAgendamiento);
        return timeA - timeB;
      });

      this.filteredRecepciones = this.recepciones; // Asigna la lista ordenada a la variable filtrada
    });
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
      console.log('Productos cargados:', this.productos); // Verifica que los productos se cargan correctamente
    }, error => {
      console.error('Error al cargar los productos:', error);
    });
  }

  getReservas(): void {
    this.recepcionService.getReservas().subscribe(reservas => {
      this.reservas = reservas;
      console.log('Reservas actualizadas:', this.reservas); // Verifica que las reservas se cargan correctamente
    }, error => {
      console.error('Error al cargar las reservas:', error);
    });
  }

  // Función para convertir una hora en formato "HH:MM" a un objeto Date
  convertToDate(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Establece la hora y minutos
    return date.getTime();
  }

  iniciarRecepcion(recepcionId: number): void {
    console.log('Iniciar Recepción:', recepcionId); // Añadir este log para verificar
    this.abrirPopupSeleccionarJaula(recepcionId);
  }

  abrirPopupSeleccionarJaula(recepcionId: number): void {
    this.recepcionSeleccionadaId = recepcionId;
    this.mostrarPopup = true;
    console.log('Mostrar Popup:', this.mostrarPopup); // Debería mostrar true
  }

  onJaulaSeleccionada(jaulaId: string): void {
    const recepcion = this.recepciones.find(r => r.id === this.recepcionSeleccionadaId);
    if (recepcion) {
      recepcion.idJaula = jaulaId;
      recepcion.horaInicioRecepcion = new Date().toLocaleTimeString();
      recepcion.estado = 'en recepcion';

      // Update the jaula in both the recepcion and the corresponding reserva
      this.jaulaService.updateJaula({ id: +jaulaId, enUso: 'S' } as Jaula).subscribe(() => {
        // Update the recepcion
        this.recepcionService.updateRecepcion(recepcion).subscribe(() => {
          this.getRecepciones();
        });

        // Find and update the corresponding reserva
        this.recepcionService.getReservaById(recepcion.id).subscribe(reserva => {
          if (reserva) {
            reserva.cabecera.horaInicioRecepcion = recepcion.horaInicioRecepcion;
            reserva.cabecera.idJaula = +jaulaId;
            this.recepcionService.updateReserva(reserva).subscribe(() => {
              console.log('Reserva actualizada con hora de inicio');
              this.getReservas();  // Recargar las reservas
            });
          }
        });
      });
    }
    this.mostrarPopup = false;
  }

  finalizarRecepcion(recepcion: Recepcion): void {
    recepcion.horaFinRecepcion = new Date().toLocaleTimeString();
    recepcion.estado = 'completado';

    this.recepcionService.updateRecepcion(recepcion).subscribe(() => {
      // Cambiar el estado de la jaula de vuelta a 'N'
      this.jaulaService.updateJaula({ id: +recepcion.idJaula, enUso: 'N' } as Jaula).subscribe(() => {
        this.getRecepciones();

        // Actualizar la reserva con la hora de fin
        this.recepcionService.getReservaById(recepcion.id).subscribe(reserva => {
          if (reserva) {
            reserva.cabecera.horaFinRecepcion = recepcion.horaFinRecepcion;

            this.recepcionService.updateReserva(reserva).subscribe(() => {
              console.log('Reserva actualizada con hora de fin');
              this.getReservas();  // Recargar las reservas
            });
          }
        });
      });
    });
  }


  closePopup(): void {
    this.mostrarPopup = false;
  }

  // Método para filtrar las recepciones por fecha de agendamiento
  filterByDate(): void {
    const selectedDate = new Date(this.selectedDate);
    console.log('Fecha seleccionada para filtrar:', this.selectedDate);

    // Verificar si la fecha seleccionada es válida
    if (isNaN(selectedDate.getTime())) {
      console.error('Fecha inválida seleccionada:', this.selectedDate);
      return;
    }

    // Filtrar las recepciones
    this.filteredRecepciones = this.recepciones.filter(recepcion => {
      let recepcionDate;

      // Verificar que la recepción tenga una fecha válida
      if (recepcion.fecha) {
        recepcionDate = new Date(recepcion.fecha);
      } else {
        console.error('Recepción sin fecha:', recepcion);
        return false;
      }

      // Si la fecha de la recepción es inválida
      if (isNaN(recepcionDate.getTime())) {
        console.error('Fecha inválida en recepcion:', recepcion.fecha);
        return false;
      }

      // Filtrar por la fecha
      return recepcionDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
    });

    console.log('Recepciones filtradas:', this.filteredRecepciones);
  }

  abrirDetalles(recepcion: Recepcion, event: MouseEvent): void {
    event.preventDefault();

    const reservaId = recepcion.id;

    // Llama al servicio para obtener la reserva
    this.recepcionService.getReservaById(reservaId).subscribe(reserva => {
      if (reserva && reserva.detalles) {
        // Mapea los detalles de la reserva y los productos
        this.productosDetalles = reserva.detalles.map(detalle => {
          const producto = this.productos.find(p => p.id === +detalle.idProducto); // Convierte idProducto a número con +

          console.log('Producto encontrado:', producto); // Verifica si se encuentra el producto
          console.log('Producto es:', producto ? producto.nombre : 'undefined');

          return {
            nombre: producto ? String(producto.nombre) : 'Producto X', // Si no se encuentra el producto, muestra "Producto X"
            cantidad: detalle.cantidad
          };
        });

        // Muestra el popup con los detalles del turno
        this.mostrarDetalles = true;
      } else {
        console.error('La reserva no tiene detalles.');
      }
    }, error => {
      console.error('Error al obtener la reserva:', error);
    });
  }

  cerrarDetalles(): void {
    this.mostrarDetalles = false;
  }
}
