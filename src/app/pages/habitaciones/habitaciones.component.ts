import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionesService, Habitacion } from '../../services/habitaciones.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habitaciones',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  habitacionesFiltradas: Habitacion[] = [];  // Para almacenar las habitaciones filtradas
  searchText: string = ''; // Para almacenar el texto ingresado en la barra de búsqueda

  constructor(
    private router: Router,
    private habitacionesService: HabitacionesService
  ) {}

  ngOnInit(): void {
    this.habitacionesService.obtenerHabitaciones().subscribe((data) => {
      console.log('Habitaciones cargadas:', data);
      this.habitaciones = data;
      this.habitacionesFiltradas = data; // Inicializamos las habitaciones filtradas con todas las habitaciones
    });
  }

  // Método para filtrar habitaciones según el texto de búsqueda
  filtrarHabitaciones() {
    if (this.searchText.trim() === '') {
      this.habitacionesFiltradas = this.habitaciones; // Si no hay texto, mostrar todas las habitaciones
    } else {
      this.habitacionesFiltradas = this.habitaciones.filter(habitacion =>
        habitacion.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        habitacion.tipo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        habitacion.precio.toString().includes(this.searchText)
      );
    }
  }

  reservar(tipoHabitacion: string) {
    this.router.navigate(['/reserva', tipoHabitacion]);
  }
}
