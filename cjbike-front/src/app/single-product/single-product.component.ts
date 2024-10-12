// single-product.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../cart/cart.service';
import axios from 'axios';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})

export class SingleProductComponent {
  producto: any;
  cantidad: number = 1;

  constructor(private route: ActivatedRoute, private carritoService: CarritoService) {
    const state = history.state;
    if (state && state.producto) {
      this.producto = state.producto;
    }
  }

  addToCart(): void {
    // Asegúrate de que la cantidad sea un número positivo
    this.cantidad = this.cantidad > 0 ? this.cantidad : 1;

    // Modificación aquí: Agrega la cantidad al objeto del producto
    const productoConCantidad = { ...this.producto, cantidad: this.cantidad };

    // Llama al servicio de carrito para agregar el producto con la cantidad especificada
    axios.post('http://localhost:3000/disminuirstock', { id: this.producto.id, cantidad: this.cantidad })
      .then(response => {
        if (response.data.success) {
          this.carritoService.agregarAlCarrito(productoConCantidad);
          window.alert('Producto añadido al carrito');
        } else {
          window.alert('Error al agregar al carrito: ' + response.data.message);
        }
      })
      .catch(error => {
        console.error('Error al agregar al carrito:', error);
        window.alert('Error al agregar al carrito');
      });
  }
}
