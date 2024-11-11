import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ProductoCreateComponent } from "./producto/producto-create/producto-create.component";
import { ProductoListComponent } from "./producto/producto-list/producto-list.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductoCreateComponent, ProductoListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Estaba incorrecto como "styleUrl", debe ser "styleUrls".
})
export class AppComponent {
  title = 'agendamiento-proveedores';
  showNavbar = true; // Nueva propiedad para controlar la visibilidad del navbar

  constructor(private router: Router) {
    // Suscríbete a los eventos de navegación para detectar cambios en la URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Oculta el navbar en la página de inicio
        this.showNavbar = !(event.url === '/' || event.url === '/home');
      }
    });
  }
}
