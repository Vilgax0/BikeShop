import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private key = 'carrito';
  private key2 = 'carrito2';

  getCarrito(): any[] {
    const carrito = localStorage.getItem(this.key);
    return carrito ? JSON.parse(carrito) : [];
  }

  agregarAlCarrito(producto: any): void {
    const carrito = this.getCarrito();
    const index = carrito.findIndex(item => item.nombre === producto.nombre);
  
    if (index !== -1) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      carrito[index].cantidad += producto.cantidad;
    } else {
      // Si el producto no está en el carrito, agrégalo
      carrito.push(producto);
    }
  
    localStorage.setItem(this.key, JSON.stringify(carrito));
     ///////////////////////////////////////////////////////////////////////////////
    const carrito2 = this.getCarrito2();
    const index2 = carrito2.findIndex(item => item.nombre === producto.nombre);
  
    if (index2 !== -1) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      carrito2[index2].cantidad += producto.cantidad;
    } else {
      // Si el producto no está en el carrito, agrégalo
      carrito2.push(producto);
    }
  
    localStorage.setItem(this.key2, JSON.stringify(carrito2));
  }
  

  eliminarDelCarrito(index: number): void {
    const carrito = this.getCarrito();
    carrito.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(carrito));
  }

  removerDelCarrito(producto: any): void {
    const carrito = this.getCarrito();
    const index = carrito.findIndex((item) => item.nombre === producto.nombre);
    if (index !== -1) {
      carrito.splice(index, 1);
      localStorage.setItem(this.key, JSON.stringify(carrito));
    }
    //////////////////////////////////////////////////////////////////////////////
    const carrito2 = this.getCarrito2();
    const index2 = carrito2.findIndex((item) => item.nombre === producto.nombre);
    if (index2 !== -1) {
      carrito2.splice(index2, 1);
      localStorage.setItem(this.key2, JSON.stringify(carrito2));
    }
  }

  limpiarCarrito(): void {
    localStorage.removeItem(this.key);
  }

  actualizarCantidadEnCarrito(producto: any): void {
    const carrito2 = this.getCarrito2();
    const productoEnCarrito = carrito2.find((p: any) => p.nombre === producto.nombre);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad = producto.cantidad;
      localStorage.setItem(this.key2, JSON.stringify(carrito2));
    }
  }


  // Otros métodos del carrito para Cart

  getCarrito2(): any[] {
    const carrito = localStorage.getItem(this.key2);
    return carrito ? JSON.parse(carrito) : [];
  }

  agregarAlCarrito2(producto: any): void {
    const carrito = this.getCarrito();
    const index = carrito.findIndex(item => item.nombre === producto.nombre);
  
    if (index !== -1) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      carrito[index].cantidad += producto.cantidad;
    } else {
      // Si el producto no está en el carrito, agrégalo
      carrito.push(producto);
    }
  
    localStorage.setItem(this.key, JSON.stringify(carrito));
  }
  
}
