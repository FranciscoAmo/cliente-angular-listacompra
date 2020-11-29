import { Component, OnDestroy, OnInit } from '@angular/core';

// esto permite obtener la ruta activada y la direccion
import { ActivatedRoute, Router } from '@angular/router';


// estos son servicios
  // este servicio es el que obtine los datos de la base de datos
import { ListService } from 'src/app/service/list.service';
  // este servicio permite enviar datos entre componentes y tiene metodos para compartir
import { SharedService } from 'src/app/service/shared.service';
// dependencia del dialogo modal
import { MatDialog } from '@angular/material/dialog';
// dialogos
// componente del Dialogo de introducir Usuarios
import { ListUserDialogComponent } from '../list-addUser-dialog/list-user-dialog.component';
// componente de elegir producto
import { ListAddProductDialogComponent} from '../list-addProduct-dialog-component/list-addProduct-dialog.component';
// modelos
  // usuarios
import { Users } from 'src/app/model/users.model';
  // lista
import { List } from 'src/app/model/lista.model';
 // producto
import { Product } from 'src/app/model/product.model';
// Snackbar
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
// animaciones de las tablas
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ListConfirmProductDialogComponent } from '../list-confirm-product-dialog/list-confirm-product.component';




@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
// animaciones se encarga de abrir y cerrar el menu de expandido de la tabla

export class ListComponent implements OnInit {


// datos de la tabla de la clase producto

 PRODUCT_DATA: Product[] = null;



  // posicion del Snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  // variables de la tabla de productos
  dataSource;
  columnsToDisplay = ['name', 'tipo', 'precio', 'med', 'quantity','Total'];
  expandedElement: List | null;



  constructor(private listservice: ListService,
              private route: ActivatedRoute,
              private gestList: SharedService,
              private router: Router,
              public dialogUser: MatDialog,
              public snackBar: MatSnackBar,
              public dialogProduct: MatDialog,
              public dialogConfirm: MatDialog
              )

  {
    this.listId = this.route.snapshot.paramMap.get('id');   // cogo el valor de la direccion enviada
    this.cargarDatos(this.listId);          // cargo los datos nada mas abrir una lista

  }


  private email: string;         // variable para coger el email del dialogo

  private listId: string ;      // valor del id de la lista que se pasa como parametro

  public cargadoInicial  = false; // booleano para cargar los primeros datos

    // modelo de las listas para que no de error angular
     listLoad: List;

     users: Users;

     productSelected: Product;


     // message de la confirmamicon
     messageConfirm: string;

    // cantidad del producto que se quiero introducir
   quantitySelected: number;

  ngOnInit() {
      console.log(this.listId);
      this.cargardatosMain(); // consulta en la base de datos cada 1000 milisegundos= 1 seg
      console.log(this.listLoad);
     // cargo la lista de productos en el product data
     // this.loadListProduct();

  }

  cargardatosMain() {
    this.cargadoInicial = false;
    // inicio las paginas con el primer enlace que clickeo
   // this.cargarDatos(this.nameList);

    // esto hace que cada vez que clike que se cambie a las otras listas
    // solo se envia al clicar en el menu lateral servicio de envio
    this.gestList.getList().subscribe(list => {
      this.listLoad = list;
      console.log(this.listLoad);
    // this.cargarDatos(this.listLoad.nameList);

      //  console.log(this.cargadoInicial);

      this.loadListProduct();
    });
    // console.log(this.listLoad);

  }

  // carga datos de los productos en un array local
  loadListProduct() {

    this.PRODUCT_DATA = this.listLoad.products;
    this.dataSource = this.PRODUCT_DATA;
  }

  // METODO INDEPENDIENTE QUE CONSULTA EN LA BASE DE DATOS
  // carga datos de la lista seleccionada
  cargarDatos(id) {
    // console.log(this.listId)
    this.cargadoInicial = false;
    this.listservice.getOneList(id).subscribe( (datos1: List) => {
      // si todo esta correcto obtengo los datos de las listas
        console.log(datos1['list'][0]);
      // alert(datos1[ 'message' ]);
        this.listLoad  = datos1['list'][0];   // cogo solo la lista elegida y la meto en el model lista
        console.log(this.listLoad);

        // datos de la tabla
        this.loadListProduct();

        // cambio del cargado de los datos
        this.cargadoInicial = true;
    }, (err) => {
      // obtengo el valor del mensage de error y lo muestro en una alerta
        console.log(err.error.message);
        this.openSnackBar(err.error.message);
        // alert('error en el registro!');

    }
    );

  }


  eliminarUsuarioDeLista(){
 // this.listLoad= this.left.lista; // elimino los datos de la vista
    this.listservice.removeUserfromList(this.listLoad._id).subscribe(data => {
      console.log(data['message']);
      this.openSnackBar(data['message']);

     // this.cargardatos();   // recargo los datos de la vista del menu lateral
     // console.log(this.left.lista);
      this.router.navigate(['/main/main']);

    });

  }

  // metodos para el dialogo modal abrir y obtener los datos para eliminar la lista al cerrarse

  openUserDialog(): void {
    this.email = null;
    // parte que abre el dialogo
    const dialogRef = this.dialogUser.open(ListUserDialogComponent, {
      data: {email: this.email}
    });

    // metodo de retorno que devuelve los valores
    dialogRef.afterClosed().subscribe(result => {
      // el resultado lo asigno a nameList y creo la lista
      if (result !== null || result !== undefined || result !== '') {

      this.email = result; // guardo el resultado en la variable
      console.log(this.email);
      console.log(this.listLoad._id)
      // creo la lista
      this.addUser();
    }
    });
  }

   // metodos para el dialogo modal abrir y obtener los datos para eliminar la lista al cerrarse

   openProductDialog(): void {

    // parte que abre el dialogo
    const dialogRef = this.dialogProduct.open(ListAddProductDialogComponent, {
        data: {listId: this.listLoad._id, messageConfirm : ''}
    });

    // metodo de retorno que devuelve los valores
    dialogRef.afterClosed().subscribe(result => {
    this.cargarDatos(this.listLoad._id);        // cago la lista
    this.loadListProduct();                     // cargo los datos de la tabla
    console.log(this.messageConfirm);
    return result;
    });

   
  }

    // aññado un usuario a la lista de usuarios
    addUser(){
      let users: Users;
        // console.log(this.listLoad);
      let exist = false; // booleano que indica si ya existe en la lista
      this.cargarDatos(this.listLoad._id);  // cargo datos de la base de datos
        // console.log(this.listLoad);
        // console.log(this.listId);
        // miro si ya existe en la BBDD
      for (users of this.listLoad.associatedUsers ) {
        if (users.email === this.email) {
            exist = true;
            break;
        }

      }

      if (!exist) {
      this.listservice.addUser(this.email, this.listLoad._id).subscribe(data => {
        this.openSnackBar(data['message']);

        this.cargarDatos(this.listLoad._id);
        console.log(this.listLoad);
      }, ( err ) => {
        this.openSnackBar(err.message);

      });
      } else {
        this.openSnackBar('ya se encuentra el usuario registrado en esa lista')
      }
      this.listId = this.route.snapshot.paramMap.get('id');

    }

      // Snackbar que muestra el callback del servidor para el usuario
    openSnackBar(message: string) {
      this.snackBar.open(message, null, {
        duration: 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    // datos de prueba de la tabla

    // añadir un producto a la lista !!!SIn COmpletar!!!!!
    addProduct() {
        this.listservice.addProduct(null,null,this.listLoad._id).subscribe(data =>
          
          this.cargarDatos(this.listLoad._id)
          ); {

        }

    }

    // elimino un producto de la lista que he seleccionado en la tabla
    removeProduct(ProductNameInput: string) {
      // cogo la lista seleecionada y el nombre de la lista del template ejecuta el boto de basura del delplegable
        this.listservice.removeProduct(ProductNameInput, this.listLoad._id).subscribe( data => {
          this.openSnackBar(data['message']);
          // cargo los datos otra vez
          this.cargarDatos(this.listLoad._id);
        });

    }

    // actualizo la cantidad de producto
    updateProduct(listSelectedId: string, newquantity: number, productname: string) {

      this.listservice.updateQuantity(productname, listSelectedId, newquantity ).subscribe( result => {

        this.openSnackBar(result ['message']);      // abro un snackbar con la respuesta
        this.cargarDatos(this.listLoad._id);
      });


    }


  // dialogo que cambia el valor de la cantidad del producto
  openUpdateDialog(productSelected: Product): void {

    // console.log(productSelected);
     // parte que abre el dialogo
     const dialogRef = this.dialogConfirm.open(ListConfirmProductDialogComponent, {
       data: {prodSelected: productSelected, quantity: this.quantitySelected }
     });

     // metodo de retorno que devuelve los valores
     dialogRef.afterClosed().subscribe(result => {
       // recogo el valor de la cantidad
       const cantidad = result;
       this.updateProduct(this.listLoad._id, result, productSelected.name);   // al cerrar actualizo el
       });
     }

}

