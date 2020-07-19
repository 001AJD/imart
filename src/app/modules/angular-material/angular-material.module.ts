import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';

const material = [
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatCardModule
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class AngularMaterialModule {}
