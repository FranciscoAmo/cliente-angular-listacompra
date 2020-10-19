import { Component, OnInit, Input } from '@angular/core';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  @Input() sidenav: LeftMenuComponent;

  constructor( private listService: ListService) { }

  ngOnInit() {

  }

  removelogging() {
    // elimino todos los datos del token y los headers
    this.listService.deletetoken();
    console.log(localStorage.getItem('token'));

  }
}

