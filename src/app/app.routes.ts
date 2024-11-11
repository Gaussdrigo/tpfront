import { Routes } from '@angular/router';
import { ProductoModule } from './producto/producto.module';
import { JaulaModule } from './jaula/jaula.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ReservaModule } from './reserva/reserva.module';
import { RecepcionModule } from './recepcion/recepcion.module';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: "producto", loadChildren: () => ProductoModule }, // Carga el módulo de productos
    { path: "jaula", loadChildren: () => JaulaModule }, // Carga el módulo de jaulas
    { path: "proveedor", loadChildren: () => ProveedorModule },
    { path: "reserva", loadChildren: () => ReservaModule },
    { path: "recepcion", loadChildren: () => RecepcionModule },

];