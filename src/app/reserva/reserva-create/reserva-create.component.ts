import { Component, OnInit } from '@angular/core';
import { FormsModule, FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Reserva, ReservaDetalle } from '../../models/reserva.model';
import { ReservaService } from '../../service/reserva.service';
import { ProveedorService } from '../../service/proveedor.service';
import { JaulaService } from '../../service/jaula.service';
import { ProductoService } from '../../service/producto.service';
import { CommonModule } from '@angular/common';
import { RecepcionService } from '../../service/recepcion.service';
declare var bootstrap: any;

@Component({
  selector: 'app-reserva-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule], // Importa módulos necesarios
  templateUrl: './reserva-create.component.html',
  styleUrls: ['./reserva-create.component.css']
})
export class ReservaCreateComponent implements OnInit {
  reservaForm: FormGroup;
  proveedores: any[] = []; // Define el tipo según tu modelo de proveedor
  jaulas: any[] = []; // Define el tipo según tu modelo de jaula
  productos: any[] = []; // Define el tipo según tu modelo de producto
  horasPredefinidas: string[] = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private proveedorService: ProveedorService,
    private jaulaService: JaulaService,
    private productoService: ProductoService,
    private recepcionService: RecepcionService
  ) {
    this.reservaForm = this.fb.group({
      cabecera: this.fb.group({
        fecha: ['', Validators.required],
        horaInicioAgendamiento: ['', Validators.required],
        horaFinAgendamiento: ['', Validators.required],
        idProveedor: ['', Validators.required],
        idJaula: [''],
        horaInicioRecepcion: [''],
        horaFinRecepcion: ['']
      }),
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProveedores();
    this.loadJaulas();
    this.loadProductos();
  }

  get detalles(): FormArray {
    return this.reservaForm.get('detalles') as FormArray;
  }

  addProducto(): void {
    this.detalles.push(this.fb.group({
      idProducto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  removeProducto(index: number): void {
    this.detalles.removeAt(index);
  }

  createReserva(): void {
    if (this.reservaForm.valid) {
      const reserva = this.reservaForm.value;
      this.reservaService.createReserva(reserva).subscribe((response) => {
        console.log('Reserva creada:', response);
        alert('Reserva creada exitosamente!');
        this.reservaForm.reset();
        this.detalles.clear();

        // Llamar al método para convertir las reservas en recepciones
        this.recepcionService.convertirReservasARecepciones();
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  
  
  private loadProveedores(): void {
    this.proveedorService.getProveedores().subscribe(
      (data) => {
        this.proveedores = data;
        console.log('Proveedores cargados:', this.proveedores);
      },
      (error) => console.error('Error al cargar proveedores:', error)
    );
  }

  private loadJaulas(): void {
    this.jaulaService.getJaulas().subscribe((data) => {
      this.jaulas = data;
    });
  }

  private loadProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }
}
