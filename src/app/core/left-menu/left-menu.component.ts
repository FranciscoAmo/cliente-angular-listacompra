import { Component, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
// servicios de consultar lista y tansmision de datos entre componentes
import { ListService } from '../../service/list.service';
import { SharedService } from 'src/app/service/shared.service';

// modulo de apertura de dialogos modales
import { MatDialog } from '@angular/material';
import { ListDialogComponent } from '../list-dialog/list-dialog.component';
import { List } from 'src/app/model/lista.model';


// ESTE COMPONENTE CONTROLA LA MAYORIA DE LOS DATOS

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit, OnDestroy {


 
// obtengo los datos del navegador

  nameList: string; // atributo para obtener el valor de la lista del dialogo
  displayName: string;  //

  // modelo de las listas para que no de error angular
  lista: List ;

 // variable que se encarga de realizar consultas continuas a la base de datos
  private intervalUpdate: any = null;

  // debo injectar el servicio de Listas
  constructor(private listservice: ListService,
              private gestlist: SharedService,
              public dialog: MatDialog) {

                this.cargardatos();
                 // pongo el nombre del usuario en el template del local storage
                this.displayName = localStorage.getItem('displayName');
              }

// metodo de inicio
  ngOnInit() {

    this.cargardatos(); // carga inicial
    this.intervalUpdate = setInterval(function() {
      this.cargardatos(); // consulta en la base de datos cada 4000 milisegundos= 4 seg
     }.bind(this), 4000);

  // console.log(this.lista);
  }

  // al cerrar el componente eliminamos el intervalo
   ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
    this.lista = null;
    this.listservice = null;
   }


   toggle(){}

  cargardatos() {
    // debo realizar una consulta al servidor obteniendo un array de listas del usuario que accedio a la pagina
    this.listservice.getData().subscribe( (listas: List) => {
      // console.log(listas);
      // alert(datos1[ 'message' ]);
        this.lista = listas;      // asigno las listas a las listas
     // console.log(this.lista);

    }, (err) => {
      // obtengo el valor del mensage de error y lo muestro en una alerta
        console.log(err.error.message);
        alert(err.error.message);
        // alert('error en el registro!');
    }
    );

  }


 // mando la lista por el servicio para no realizar otra consulta;
 // recorro el array de listas y si coincide el nombre con la lista la envio para mostrarla
  sendListForm(lista1){

    for(let listaselected of this.lista['list'] ) {
      if(lista1 === listaselected[ '_id' ]) {
       // console.log(listaselected['nameList']);
        this.gestlist.sendList(listaselected);    // metodo del servicio que envia la lista al clicar en ella
      }
    }
  }



  // metodos para el dialogo modal abrir y obtener los datos para eliminar la lista al cerrarse

  openDialog(): void {
    this.nameList = null;
    // parte que abre el dialogo
    const dialogRef = this.dialog.open(ListDialogComponent, {
      data: {nameList: this.nameList}     // datos a introducir en el dialogo
    });

    // metodo de retorno que devuelve los valores
    dialogRef.afterClosed().subscribe(result => {
      // el resultado lo asigno a nameList y creo la lista
      if (result !== null || result !== undefined) {

      this.nameList = result; // guardo el resultado en la variable
      console.log(this.nameList);
      // creo la lista
      this.crearLista();
    }
    });
  }

  // crea la lista cogiendo el token que esta guardado si se crea pondra "Creado" si no Pondra pon un nombre(mensages de servidor)
  crearLista() {
    this.listservice.createList(this.nameList).subscribe( data => {
      this.lista = null;  // reinicio la lista
      this.cargardatos(); // la vuelvo a rellenar

    }, (err) => {
      // obtengo el valor del mensage de error y lo muestro en una alerta
        console.log(err.error.message);
        alert(err.error.message);
        // alert('error en el registro!');
    });

  }

}
