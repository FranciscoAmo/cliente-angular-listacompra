import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([]),
    CoreModule
  ],
  declarations: [MainlayoutComponent],

  exports: [MainlayoutComponent]
  
})
export class LayoutModule { }
