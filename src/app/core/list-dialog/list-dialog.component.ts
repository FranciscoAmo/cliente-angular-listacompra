import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ListService } from '../../service/list.service';

// interface de los datos que voy a mandar al componente principal
export interface DialogData {
  nameList: string;
}



@Component({
  selector: 'app-list-dialog.component',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})

export class ListDialogComponent  {
  // introduzco el servicio de manejo de listas
  constructor( public dialogRef: MatDialogRef<ListDialogComponent>,
               @Inject (MAT_DIALOG_DATA) public data: DialogData) {}


    // metodo para cerrar la referencia al dialogo modal
   onNoClick(): void {
     this.data.nameList = null;
     this.dialogRef.close();
  }

}



