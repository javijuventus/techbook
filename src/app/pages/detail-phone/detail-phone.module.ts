import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic4-rating';
import { DetailPhonePage } from './detail-phone.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: DetailPhonePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipesModule,
    IonicRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailPhonePage]
})
export class DetailPhonePageModule {}
