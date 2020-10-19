// modulo que contiene todos los componentes de la libreria matrerial exportamos para usar en el resto de modulos
// modulo organizativo

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modulos de Material

import {
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatSidenavModule,
  MatBadgeModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTableModule

} from '@angular/material';




import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modulos para formularios
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    // Material
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSidenavModule,
    MatBadgeModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    // Forms
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: []
})
export class MaterialFormsModule { }
