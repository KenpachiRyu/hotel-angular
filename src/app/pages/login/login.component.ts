import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  reservas: any[] = [];
  contactos: any[] = [];
  sesionIniciada = false;

  admins = [
    { username: 'admin1', password: '1234', name: 'Admin Uno' },
    { username: 'admin2', password: 'admin456', name: 'Admin Dos' },
    { username: 'admin3', password: 'admin789', name: 'Admin Tres' }
  ];

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const admin = this.admins.find(a => a.username === this.username && a.password === this.password);

    if (admin) {
      Swal.fire('¡Bienvenido!', `Hola ${admin.name}`, 'success');
      this.sesionIniciada = true;

      const reservasLS = localStorage.getItem('reserva');
      const contactosLS = localStorage.getItem('formularioContacto');

      // Cargar reservas y contactos desde localStorage
      this.reservas = reservasLS ? JSON.parse(reservasLS) : [];
      this.contactos = contactosLS ? JSON.parse(contactosLS) : [];
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  }

  cerrarSesion() {
    // Cerrar sesión y limpiar datos
    this.sesionIniciada = false;
    this.username = '';
    this.password = '';
    Swal.fire('Sesión cerrada', 'Has cerrado sesión exitosamente.', 'info');
  }

  eliminarReserva(index: number) {
    Swal.fire({
      title: '¿Eliminar reserva?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.reservas.splice(index, 1);
        localStorage.setItem('reserva', JSON.stringify(this.reservas));
        Swal.fire('Eliminado', 'La reserva fue eliminada.', 'success');
      }
    });
  }

  eliminarContacto(index: number) {
    Swal.fire({
      title: '¿Eliminar contacto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.contactos.splice(index, 1);
        localStorage.setItem('formularioContacto', JSON.stringify(this.contactos));
        Swal.fire('Eliminado', 'El contacto fue eliminado.', 'success');
      }
    });
  }

  editarCampo(array: 'reserva' | 'contacto', index: number, campo: string, nuevoValor: string) {
    if (array === 'reserva') {
      this.reservas[index][campo] = nuevoValor;
      localStorage.setItem('reserva', JSON.stringify(this.reservas));
    } else {
      this.contactos[index][campo] = nuevoValor;
      localStorage.setItem('formularioContacto', JSON.stringify(this.contactos));
    }
    Swal.fire('Actualizado', 'Los datos han sido modificados.', 'success');
  }

  editarNombreReserva(index: number) {
    const nuevoNombre = window.prompt('Nuevo nombre del cliente:', this.reservas[index].nombreCliente);
    if (nuevoNombre && nuevoNombre.trim() !== '') {
      this.editarCampo('reserva', index, 'nombreCliente', nuevoNombre.trim());
    }
  }

  editarNombreContacto(index: number) {
    const nuevoNombre = window.prompt('Nuevo nombre del contacto:', this.contactos[index].nombre);
    if (nuevoNombre && nuevoNombre.trim() !== '') {
      this.editarCampo('contacto', index, 'nombre', nuevoNombre.trim());
    }
  }
}
