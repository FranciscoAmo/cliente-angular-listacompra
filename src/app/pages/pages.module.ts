import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { ListComponent } from './list/list.component';
import { ListService } from '../service/list.service';
import { LeftMenuComponent } from '../core/left-menu/left-menu.component';
import { ListUserDialogComponent } from './list-addUser-dialog/list-user-dialog.component';
import { ListAddProductDialogComponent } from './list-addProduct-dialog-component/list-addProduct-dialog.component';
import { ProductService } from '../service/product.service';
import { ListConfirmProductDialogComponent } from './list-confirm-product-dialog/list-confirm-product.component';
import { ChangeColumnsPipe } from '../pipes/change-column-table.pipe';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    ListUserDialogComponent,
    ListAddProductDialogComponent,
    ListConfirmProductDialogComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    PageRoutingModule,


  ],
  exports: [
    MainComponent,
    ListComponent,
    ListUserDialogComponent,
    ListAddProductDialogComponent,
    ListConfirmProductDialogComponent
  ],
  providers: [
    ListService,
    LeftMenuComponent,
    ProductService
  ],
  entryComponents: [
    ListUserDialogComponent, ListAddProductDialogComponent, ListConfirmProductDialogComponent
  ]
})
export class PagesModule { }
