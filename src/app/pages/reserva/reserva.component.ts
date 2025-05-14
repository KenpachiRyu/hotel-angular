import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitacionesService } from '../../services/habitaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  noches = 1;
  huespedes = 1;
  fechaHoy: string = '';
  fechaReserva: string = '';

  nombreCliente: string = '';
  correoCliente: string = '';

  habitaciones: any[] = [];
  habitacionSeleccionada: any = null;

  extras = [
    { nombre: 'Barra Libre', precio: 700, selected: false },
    { nombre: 'Jacuzzi', precio: 500, selected: false },
    { nombre: 'Mascota', precio: 300, selected: false }
  ];

  reservas: any[] = []; // Asegurémonos de que esta variable siempre esté presente

  constructor(private habitacionesService: HabitacionesService) {}

  ngOnInit(): void {
    this.habitacionesService.obtenerHabitaciones().subscribe(data => {
      this.habitaciones = data;
    });

    const hoy = new Date();
    this.fechaHoy = hoy.toISOString().split('T')[0];
    this.cargarReserva(); // Cargar las reservas desde localStorage al iniciar
  }

  cargarReserva() {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reserva') || '[]');
    if (reservasGuardadas && reservasGuardadas.length > 0) {
      this.reservas = reservasGuardadas;
    }
  }

  seleccionarHabitacion(habitacion: any) {
    this.habitacionSeleccionada = habitacion;
    this.huespedes = 1;
  }

  get total(): number {
    if (!this.habitacionSeleccionada) return 0;
    const extrasTotal = this.extras
      .filter(e => e.selected)
      .reduce((sum, e) => sum + e.precio, 0);
    return (this.noches * this.habitacionSeleccionada.precio) + extrasTotal;
  }

  get maxHuespedes(): number {
    if (!this.habitacionSeleccionada) return 1;
    switch (this.habitacionSeleccionada.tipo) {
      case 'individual': return 1;
      case 'doble': return 2;
      case 'suite': return 3;
      case 'familiar': return 4;
      case 'presidencial': return 6;
      case 'luxury': return 8;
      default: return 1;
    }
  }

  incrementar(tipo: 'noche' | 'huesped') {
    if (tipo === 'noche') {
      this.noches++;
    } else if (tipo === 'huesped' && this.huespedes < this.maxHuespedes) {
      this.huespedes++;
    }
  }

  decrementar(tipo: 'noche' | 'huesped') {
    if (tipo === 'noche' && this.noches > 1) {
      this.noches--;
    }
    if (tipo === 'huesped' && this.huespedes > 1) {
      this.huespedes--;
    }
  }

  guardarReserva() {
    const reserva = {
      habitacionSeleccionada: this.habitacionSeleccionada,
      noches: this.noches,
      huespedes: this.huespedes,
      extras: this.extras,
      fechaReserva: this.fechaReserva,
      nombreCliente: this.nombreCliente,
      correoCliente: this.correoCliente,
      total: this.total
    };

    console.log('Guardando reserva:', reserva); // Verifica que los datos se estén guardando correctamente

    // Obtener las reservas existentes
    let reservasGuardadas = JSON.parse(localStorage.getItem('reserva') || '[]');

    // Asegurarnos de que reservasGuardadas sea un arreglo válido
    if (!Array.isArray(reservasGuardadas)) {
      reservasGuardadas = [];
    }

    // Agregar la nueva reserva al arreglo
    reservasGuardadas.push(reserva);

    // Guardar todas las reservas en localStorage
    localStorage.setItem('reserva', JSON.stringify(reservasGuardadas));

    // Actualizar la lista de reservas en el componente
    this.reservas = reservasGuardadas;
  }

  reservar() {
    if (!this.habitacionSeleccionada || !this.fechaReserva || !this.nombreCliente || !this.correoCliente.includes('@')) {
      Swal.fire('Error', 'Completa todos los campos obligatorios correctamente.', 'error');
      return;
    }

    this.guardarReserva();

    Swal.fire({
      title: '¡Reservación Exitosa!',
      text: `Has reservado la ${this.habitacionSeleccionada.nombre} para el día ${this.fechaReserva}`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
}


