import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  // Mantiene el estado actual de la lista de productos.
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();

  private apiUrl = 'http://localhost:3000/productos'; // URL de json-server

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Obtener un producto por su id
  getProductoById(id: number): Observable<Producto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Producto>(url);
  }

  // Crear un nuevo producto
  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto).pipe(
      tap(() => {
        this.getProductos().subscribe(productos => this.productosSubject.next(productos));
      })
    );
    
  }

  // Actualizar un producto existente
  updateProducto(producto: Producto): Observable<Producto> {
    const url = `${this.apiUrl}/${producto.id}`;
    return this.http.put<Producto>(url, producto).pipe(
      tap(() => {
        this.getProductos().subscribe(productos => this.productosSubject.next(productos));
      })
    );;
  }

  // Eliminar un producto
  deleteProducto(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.getProductos().subscribe(productos => this.productosSubject.next(productos));
      })
    );
  }
}
