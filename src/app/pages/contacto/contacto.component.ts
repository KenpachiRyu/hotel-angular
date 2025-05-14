import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: [''], // Ya no es obligatorio
      aceptaInfo: [false],
      aceptaTerminos: [false, Validators.requiredTrue]
    });
  }

  enviarFormulario() {
    if (this.contactoForm.valid) {
      const datos = this.contactoForm.value;

      // Recupera los contactos existentes de localStorage (si los hay)
      let contactosGuardados = JSON.parse(localStorage.getItem('formularioContacto') || '[]');

      // Verifica que contactosGuardados sea un arreglo
      if (!Array.isArray(contactosGuardados)) {
        contactosGuardados = [];
      }

      // Agrega el nuevo contacto al arreglo de contactos
      contactosGuardados.push(datos);

      // Guarda el arreglo actualizado en localStorage
      localStorage.setItem('formularioContacto', JSON.stringify(contactosGuardados));

      Swal.fire({
        icon: 'success',
        title: 'Formulario enviado',
        text: 'Gracias por tu mensaje.'
      });

      // Resetea el formulario
      this.contactoForm.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Revisa los campos obligatorios.'
      });
    }
  }
}

