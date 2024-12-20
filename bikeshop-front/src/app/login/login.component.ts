import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    const data = { email: this.email, password: this.password };

    axios.post('http://localhost:3000/login', data)
      .then(response => {
        const userData = response.data;
        console.log('Respuesta del servidor:', userData);

        // Almacena el token en el localStorage
        localStorage.setItem('token', userData.token);

        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.errorMessage = 'Credenciales inválidas';
        console.error('Error al enviar la solicitud:', error);
      });
  }
}
