import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
})

export class PruebaComponent implements OnInit {
  productos: any[] = []; // Inicializa productos como un arreglo vacío

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }
}
