import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/model/product.model';




// interface de los datos que voy a mandar al componente principal
export interface DialogDataConfirm {
  prodSelected: Product;
  quantitySelected: number;

}



@Component({
  selector: 'app-list-dialog.component',
  templateUrl: './list-confirm-product.component.html',
  styleUrls: ['./list-confirm-product.component.css']
})

export class ListConfirmProductDialogComponent  {
  // introduzco el servicio de manejo de listas
  constructor( public dialogRefCoonfirm: MatDialogRef<ListConfirmProductDialogComponent >,
               @Inject (MAT_DIALOG_DATA) public dataConfirm: DialogDataConfirm
              ) {}


    // metodo para cerrar la referencia al dialogo modal
   onNoClick(): void {
      this.dataConfirm.prodSelected = null;
      this.dataConfirm.quantitySelected = null;
      this.dialogRefCoonfirm.close();
  }


    // metodos para el dialogo modal abrir y obtener los datos para eliminar la lista al cerrarse


}



