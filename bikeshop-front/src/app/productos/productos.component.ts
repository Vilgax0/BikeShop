import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { CarritoService } from '../cart/cart.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];

  constructor(private router: Router, private carritoService: CarritoService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    axios.get('http://localhost:3000/obtenerproductos')
      .then(response => {
        this.productos = response.data;
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }

  addToCart(producto: any): void {
    const cantidad = 1;
    const productoConCantidad = { ...producto, cantidad };

    axios.post('http://localhost:3000/disminuirstock', { id: producto.id, cantidad })
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

  navigateToDetalleProducto(producto: any) {
    this.router.navigate(['/producto', producto.nombre], { state: { producto } });
  }
}
