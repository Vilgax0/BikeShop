import { Component, ChangeDetectorRef } from '@angular/core';
import { CarritoService } from './cart.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import axios from 'axios';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  carrito: any[] = [];
  showSuccess: boolean = false;
  showCancel: boolean = false;
  showError: boolean = false;

  payPalConfig?: IPayPalConfig;

  constructor(
    public carritoService: CarritoService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.carrito = carritoService.getCarrito();
    this.initConfig();
  }

  initConfig(): void {
    this.payPalConfig = {
      clientId: 'AdF_h5RRAIPLd9b_Ip5I9A-AhbHyqsnesu1U6iemwEC0HLsc1y9Nj70aGbBvn_dWBmI-XYEpgKb7bsXn',
      createOrderOnClient: (data: any): ICreateOrderRequest => {
        const subtotal = this.calcularSubtotal();
        const envio = 1;

        return {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: (subtotal + envio).toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: subtotal.toFixed(2),
                },
                shipping: {
                  currency_code: 'USD',
                  value: envio.toFixed(2),
                }
              }
            },
            items: this.carrito.map((producto) => {
              return {
                name: producto.nombre,
                quantity: producto.cantidad.toString(),
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: producto.precio.toFixed(2),
                },
                
              };
            })
          }]
        };
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data: any, actions: any) => {
        console.log('Transacción aprobada pero no autorizada', data, actions);
        actions.order.get().then((details: any) => {
          console.log('Detalles completos de la orden: ', details);
          // Aquí es donde debes informar a tu servidor sobre la transacción aprobada
          axios.post('http://localhost:3000/aprobar-orden', { orderId: data.orderID, orderDetails: details })
            .then(response => {
              console.log('La orden ha sido aprobada con éxito', response.data);
            })
            .catch(e => {
              console.error('Hubo un error al aprobar la orden', e);
            });
        });
      },
      onClientAuthorization: (data: any) => {
        console.log('Se debe informar al servidor sobre la transacción completada en este punto', data);
        this.showSuccess = true;
        // Aquí es donde debes informar a tu servidor sobre la transacción completada
        axios.post('http://localhost:3000/capturar-orden', { orderId: data.id, amount: data.purchase_units[0].amount })
          .then(response => {
            console.log('La orden ha sido capturada con éxito', response.data);
          })
          .catch(e => {
            console.error('Hubo un error al capturar la orden', e);
          });
      },
      
      
      
      onCancel: (data: any, actions: any) => {
        console.log('Cancelado', data, actions);
        this.showCancel = true;
      },
      onError: (err: any) => {
        console.log('Error', err);
        this.showError = true;
      },
      onClick: (data: any, actions: any) => {
        console.log('Click', data, actions);
        this.resetStatus();
      }
    };
  }

  resetStatus(): void {
    this.showSuccess = false;
    this.showCancel = false;
    this.showError = false;
  }

  removerDelCarrito(producto: any): void {

    axios.post('http://localhost:3000/aumentarstock', { id:producto.id, cantidad:producto.cantidad })
      .then(response => {
        if (response.data.success) {  
          this.carritoService.removerDelCarrito(producto);
          this.carrito = this.carritoService.getCarrito();
          this.changeDetectorRef.detectChanges();
        }
      })
      .catch(error => {
        console.error('Error al remover del carrito:', error);
        window.alert('Error al remover del carrito');
      });
  }

  calcularSubtotal(): number {
    const productos = this.carritoService.getCarrito();
    return productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  }

  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const envio = 1; // Ejemplo de envío fijo
    return subtotal + envio;
  }

  actualizarCantidad(producto: any): void {
    this.carritoService.actualizarCantidadEnCarrito(producto);
  }

  async actualizarCarrito(): Promise<void> {
    const carritolocal = this.carritoService.getCarrito2();
    const carritoreal = this.carritoService.getCarrito();
    let retorno = "No se pudo agregar las unidades en ";
  
    for (let i = 0; i < carritolocal.length; i++) {
      console.log(`Iteración ${i + 1}`);
  
      if (carritolocal[i].cantidad > carritoreal[i].cantidad) {
        console.log('Disminuir stock');
        try {
          const response = await axios.post('http://localhost:3000/disminuirstock', {
            id: carritolocal[i].id,
            cantidad: carritolocal[i].cantidad - carritoreal[i].cantidad
          });
  
          console.log('Respuesta disminuir stock:', response.data);
  
          if (response.data.success) {
            carritoreal[i].cantidad = carritolocal[i].cantidad;
            console.log('Cantidad actualizada en carritoreal:', carritoreal[i].cantidad);
          } else {
            retorno += carritolocal[i].nombre;
            carritolocal[i].cantidad = carritoreal[i].cantidad;
            window.alert(carritolocal[i].cantidad);
            this.carritoService.actualizarCantidadEnCarrito(carritolocal[i]);
          }
        } catch (error) {
          console.error('Error al disminuir stock:', error);
          window.alert('Error al disminuir stock');
        }
      } else if (carritolocal[i].cantidad < carritoreal[i].cantidad) {
        console.log('Aumentar stock');
        try {
          const response = await axios.post('http://localhost:3000/aumentarstock', {
            id: carritolocal[i].id,
            cantidad: carritoreal[i].cantidad - carritolocal[i].cantidad
          });
  
          console.log('Respuesta aumentar stock:', response.data);
  
          if (response.data.success) {
            carritoreal[i].cantidad = carritolocal[i].cantidad;
            console.log('Cantidad actualizada en carritoreal:', carritoreal[i].cantidad);
          }
        } catch (error) {
          console.error('Error al aumentar stock:', error);
          window.alert('Error al aumentar stock');
        }
      }
    }
  
    localStorage.setItem('carrito', JSON.stringify(carritoreal));
    localStorage.setItem('carrito2', JSON.stringify(carritolocal));
    window.alert(retorno);
    this.carrito=this.carritoService.getCarrito();
  }
  
  

  realizarPago(): void {
    console.log('Procesando pago...');
  }
}
