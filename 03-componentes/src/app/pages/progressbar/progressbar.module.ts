import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressbarPageRoutingModule } from './progressbar-routing.module';

import { ProgressbarPage } from './progressbar.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressbarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProgressbarPage]
})
export class ProgressbarPageModule {}
