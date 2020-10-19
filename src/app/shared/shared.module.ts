// modulo principal de los comunes importa los diferentes modulos y los exporta para el resto de la aplicacion

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialFormsModule } from './material-forms/material-forms.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ChangeColumnsPipe } from '../pipes/change-column-table.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialFormsModule
  ],
  declarations: [ChangeColumnsPipe],
  exports: [
    MaterialFormsModule,
    HttpClientModule,
    ChangeColumnsPipe
  ]
})
export class SharedModule { }
