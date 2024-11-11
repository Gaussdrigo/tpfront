import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar peticiones HTTP
import { Injectable } from '@angular/core'; // Importa Injectable para que Angular pueda inyectar este servicio en otros componentes o servicios
import { Proveedor } from '../models/proveedor.model'; // Importa la interfaz o clase que define el modelo de Proveedor
import { BehaviorSubject, Observable, tap } from 'rxjs'; // Importa clases y operadores de RxJS para gestionar la programación reactiva

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación (no es necesario añadirlo a un módulo de providers)
})
export class ProveedorService {

  // BehaviorSubject mantiene el estado actual de la lista de proveedores y notifica a los suscriptores cuando cambia.
  private proveedoresSubject = new BehaviorSubject<Proveedor[]>([]);
  
  // Exponemos el BehaviorSubject como un Observable para que los componentes puedan suscribirse y recibir actualizaciones de la lista de proveedores.
  proveedores$ = this.proveedoresSubject.asObservable();

  // Otro BehaviorSubject para manejar la comunicación entre componentes, específicamente para el proveedor actualmente seleccionado.
  private proveedorSource = new BehaviorSubject<any>(null);
  currentProveedor = this.proveedorSource.asObservable();

  // Este método permite cambiar el proveedor actual y notificar a los suscriptores.
  changeProveedor(proveedor: any) {
    this.proveedorSource.next(proveedor);
  }

  // Este método establece un proveedor para ser editado y notifica a los suscriptores.
  setProveedorEdit(proveedor: Proveedor) {
    this.proveedorSource.next(proveedor);
  }

  // URL de la API JSON donde se gestionan los datos de los proveedores.
  private apiUrl = 'http://localhost:3000/proveedores'; 

  // El constructor inyecta HttpClient para realizar peticiones HTTP a la API.
  constructor(private http: HttpClient) { }

  // Método para obtener todos los proveedores de la API. Retorna un Observable que emite una lista de Proveedores.
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }
  //Metodo para obtener el proveedor por Nombre
  getProveedoresByName(name: string): Observable<Proveedor[]> {
    const url = `${this.apiUrl}?nombre_like=${name}`;
    return this.http.get<Proveedor[]>(url);
  }

  // Método para obtener un proveedor por su ID. Retorna un Observable que emite un Proveedor.
  getProveedorById(id: number): Observable<Proveedor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Proveedor>(url);
  }

  // Método para crear un nuevo proveedor. Retorna un Observable que emite el proveedor creado.
  addProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, proveedor).pipe(
      // Utilizamos `tap` para realizar una acción secundaria, en este caso, refrescar la lista de proveedores después de la creación.
      tap(() => {
        this.getProveedores().subscribe(proveedores => this.proveedoresSubject.next(proveedores));
      })
    );
  }

  // Método para actualizar un proveedor existente. Retorna un Observable que emite el proveedor actualizado.
  updateProveedor(proveedor: Proveedor): Observable<Proveedor> {
    const url = `${this.apiUrl}/${proveedor.id}`;
    return this.http.put<Proveedor>(url, proveedor).pipe(
      tap(() => {
        this.getProveedores().subscribe(proveedores => this.proveedoresSubject.next(proveedores));
      })
    );
  }

  // Método para eliminar un proveedor por su ID. Retorna un Observable vacío (void) cuando la operación se completa.
  deleteProveedor(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`; // Construye la URL específica del proveedor basado en su ID.
    return this.http.delete<void>(url).pipe(
      // Utilizamos `tap` para refrescar la lista de proveedores después de la eliminación.
      tap(() => {
        this.getProveedores().subscribe(proveedores => this.proveedoresSubject.next(proveedores));
      })
    );
  }
}

