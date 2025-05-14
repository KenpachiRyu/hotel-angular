import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <--- necesario para peticiones HTTP

import { HomeComponent } from './app/pages/home/home.component';
import { HabitacionesComponent } from './app/pages/habitaciones/habitaciones.component';
import { ServiciosComponent } from './app/pages/servicios/servicios.component';
import { ContactoComponent } from './app/pages/contacto/contacto.component';
import { ReservaComponent } from './app/pages/reserva/reserva.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'habitaciones', component: HabitacionesComponent },
  { path: 'reservar', component: ReservaComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'reserva/:tipo', component: ReservaComponent },
  { path: 'login', loadComponent: () => import('./app/pages/login/login.component').then(m => m.LoginComponent) }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // <--- Esto es lo que faltaba
  ],
});
