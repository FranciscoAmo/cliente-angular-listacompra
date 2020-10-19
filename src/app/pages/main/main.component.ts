import { Component, OnInit } from '@angular/core';
// modelo de la lista
import { List } from 'src/app/model/lista.model';
// servicio de llamada a la base de datos de listas
import { ListService } from 'src/app/service/list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // objeto listas para obtener los datos
  lista: List;

  constructor(private listService: ListService) { }


    // al arrancar cargo los datos
  ngOnInit() {
      this.cargardatos();
  }

  // cargamos los datos con ñ abase de datos 
  cargardatos() {
    // si la lista no esta vacia se vacia para rellenar seguidamente
    if (this.lista != null) {
    this.lista = null;
    }
    // debo realizar una consulta al servidor obteniendo un array de listas del usuario que accedio a la pagina
    this.listService.getData().subscribe( (listas: List) => {
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

  

}
