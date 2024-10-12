import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgxPayPalModule } from 'ngx-paypal';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductosComponent } from './productos/productos.component';
import { LogoCarouselComponent } from './logo-carousel/logo-carousel.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { PruebaComponent } from './prueba/prueba.component';

const firebaseConfig = {
  apiKey: "AIzaSyDRrX4Eqrj7y5mi-ctBnsMdSI7arGj5hbk",
  authDomain: "jcbike-74f69.firebaseapp.com",
  databaseURL: "https://jcbike-74f69-default-rtdb.firebaseio.com",
  projectId: "jcbike-74f69",
  storageBucket: "jcbike-74f69.appspot.com",
  messagingSenderId: "238225156704",
  appId: "1:238225156704:web:9ce1d1066dbe60e8543105",
  measurementId: "G-15F9W7NRMY"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeadComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProductosComponent,
    LogoCarouselComponent,
    SingleProductComponent,
    CartComponent,
    PruebaComponent,
  ],
  imports: [
    NgxPayPalModule,
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
