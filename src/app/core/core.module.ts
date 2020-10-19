import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { MatToolbarModule, MatListModule, MatDividerModule, MatDialog } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ListService } from '../service/list.service';
import { SharedService } from '../service/shared.service';
import { ListDialogComponent } from './list-dialog/list-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [TopMenuComponent, LeftMenuComponent, ListDialogComponent],
  providers: [ListService,
              SharedService,
              SharedModule,
              ],
  exports: [
    TopMenuComponent,
    LeftMenuComponent,
    ListDialogComponent,
    ],
  entryComponents: [ListDialogComponent]
})
export class CoreModule { }
