import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';

const material = [MatBadgeModule, MatDialogModule];

@NgModule({
  imports: [material],
  exports: [material],
})
export class AngularMaterialModule {}
