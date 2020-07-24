import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioPage } from '../pages/inicio';

@NgModule({
  declarations: [
    InicioPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioPage),
  ],
})
export class PagesInicioPageModule {}
