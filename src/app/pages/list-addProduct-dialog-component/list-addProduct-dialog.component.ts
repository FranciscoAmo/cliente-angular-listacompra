import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';
import { ListConfirmProductDialogComponent } from '../list-confirm-product-dialog/list-confirm-product.component';
import { ListService } from '../../service/list.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



// interface de los datos que voy a mandar al componente principal
export interface DialogData {
  listId: string;
  messageConfirm: string;
}



@Component({
  selector: 'app-list-dialog.component',
  templateUrl: './list-addProduct-dialog.component.html',
  styleUrls: ['./list-addProduct-dialog.component.css']
})

export class ListAddProductDialogComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  // introduzco el servicio de manejo de listas
  constructor( public dialogRefProduct: MatDialogRef<ListAddProductDialogComponent>,
               private productService: ProductService,
               public  dialogConfirm: MatDialog,
               public snackBar: MatSnackBar,
               private listService: ListService,         // list service para añadir un producto
               @Inject (MAT_DIALOG_DATA) public datProduct: DialogData
               ) {}

    // array de productos para usarlos
    listAllProduct: Product[];

    // array de tipos de productos
 listTypeProducts = [{name: 'verdura', url: '../../assets/images/tipos/vegetales.png'},
                     {name: 'legumbre', url: '../../assets/images/tipos/legumbres.png'},
                     {name: 'fruta', url: '../../assets/images/tipos/fruta.png'},
                     {name: 'lacteo', url: '../../assets/images/tipos/lacteos.png'},
                     {name: 'carne', url: '../../assets/images/tipos/carne.png'},
                     {name: 'pescado', url: '../../assets/images/tipos/pescado.png'},
                     {name: 'helado', url: '../../assets/images/tipos/helado.png'},
                     {name: 'limpieza', url: '../../assets/images/tipos/limpieza.png'},
                     {name: 'higiene', url: '../../assets/images/tipos/higiene.png'},
                     {name: 'detergente', url: '../../assets/images/tipos/detergente.png'},
                     {name: 'condimento', url: '../../assets/images/tipos/condimentos.png'},
                     {name: 'bebida',  url: '../../assets/images/tipos/bebida.png'}];

  listTypeImages: string[] = ['../../assets/images/logo.png'];

 
     // array donde cargare los productos del tipo
  listByProductType: Product[] = null;
      // variable del producto seleccionado
  selectedType = '';

    // id del producto selecionado para el dialogo de confirmacion
   productSelectedId: string;
   // cantidad del producto que se quiero introducir
   quantitySelected: number;

  ngOnInit(): void {
      this.productService.getAllProdcudts().subscribe( (data: Product[]) =>{
        this.listAllProduct = data;
        console.log(data);
      });

     // console.log(this.listAllProduct);
      console.log( this.datProduct.listId);  // id de la lista seleccionada una vez he dado al dialogo de productos
  }

  // cojo del array cargado los productos del tipo que quiero
  loadProductsByType(type: string) {
      this.selectedType = null;
      // vacio el array
      this.listByProductType = null;
     // recorro el array de todos los productos me quedo con los que sean de un tipo y guardo en el array

      this.listByProductType = this.listAllProduct.filter(productByType => productByType.tipo === type)
      console.log(this.listByProductType);

      // incluyo el valor en la parte superior
      this.selectedType = type;

      }



    // metodo para cerrar la referencia al dialogo modal
   onNoClick(): void {
     // this.datProduct.email = undefined;
      this.dialogRefProduct.close();
  }

// abro otro dialogo para confirma que eligo un producto y la cantidad y al cerrar lo introduzco en la lista

  openConfirmDialog(productSelected: Product): void {
    console.log(productSelected);
    // parte que abre el dialogo
    const dialogRef = this.dialogConfirm.open(ListConfirmProductDialogComponent, {
      data: {prodSelected: productSelected, quantity: this.quantitySelected }
    });

    // metodo de retorno que devuelve los valores
    dialogRef.afterClosed().subscribe(result => {
      // recogo el valor de la cantidad 
      const cantidad = result;
      // console.log(result)

      this.listService.addProduct(productSelected.name, cantidad, this.datProduct.listId).subscribe(response =>{
        // console.log(response['message']);
        this.openSnackBar(response['message']);
      });
      this.dialogRefProduct.close();
    }
    );
  }


       // Snackbar que muestra el callback del servidor para el usuario
       openSnackBar(message: string) {
        this.snackBar.open(message, null, {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }



}



