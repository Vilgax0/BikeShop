import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firestore: AngularFirestore) { }

  getProductos() {
    return this.firestore.collection('productos').valueChanges();
  }
}
