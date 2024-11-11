import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent, // Declara HomeComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes), // Agrega las rutas
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
