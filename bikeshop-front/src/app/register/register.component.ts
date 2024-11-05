import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private router: Router) { }

  onSubmit() {
    const data = { name: this.name, email: this.email, password: this.password };
    if (!this.validarCorreo()) {
      this.errorMessage = 'Correo inválido';
      return;
    }
    if(this.password.length <= 6){
      this.errorMessage = 'Contraseña inválida';
      return;
    }
    axios.post('http://localhost:3000/register', data)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        Swal.fire({
          title: '¡Se ha creado el usuario correctamente!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.errorMessage = error.response ? error.response.data : 'Error desconocido' + error;
        console.error('Error al enviar la solicitud:', error);
        //window.alert(this.errorMessage);
      });
  }

  validarCorreo(){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }
}
