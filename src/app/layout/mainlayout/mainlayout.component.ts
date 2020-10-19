import { Component, OnInit } from '@angular/core';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css']
})
export class MainlayoutComponent {

  sidebarMode = 'side';   // hace que la barra lateral se coloque a un lado y desplaze el principal css

 // lo meto en el contructor
  constructor(
    private listservice: ListService) {
    this.listservice.loadHeaders();     // cargo los headers al abrir esta pagina
    }

}
