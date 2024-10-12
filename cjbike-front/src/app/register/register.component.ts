import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

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

    axios.post('http://localhost:3000/register', data)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        window.alert('Te has registrado exitosamente');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.errorMessage = error.response ? error.response.data : 'Error desconocido';
        console.error('Error al enviar la solicitud:', error);
        window.alert(this.errorMessage);
      });
  }
}
