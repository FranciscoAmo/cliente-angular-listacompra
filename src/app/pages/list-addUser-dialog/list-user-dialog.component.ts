import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



// interface de los datos que voy a mandar al componente principal
export interface DialogData {
  email: string;
}



@Component({
  selector: 'app-list-dialog.component',
  templateUrl: './list-user-dialog.component.html',
  styleUrls: ['./list-user-dialog.component.css']
})

export class ListUserDialogComponent  {
  // introduzco el servicio de manejo de listas
  constructor( public dialogRef: MatDialogRef<ListUserDialogComponent>,
               @Inject (MAT_DIALOG_DATA) public data: DialogData) {}


    // metodo para cerrar la referencia al dialogo modal
   onNoClick(): void {
      this.data.email = undefined;
      this.dialogRef.close();
  }

}



