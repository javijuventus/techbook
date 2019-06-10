import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneCardComponent } from './phone-card/phone-card.component';
import { PhoneGridComponent } from './phone-grid/phone-grid.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { IonicRatingModule } from 'ionic4-rating';
import { DetalleComponent } from './detalle/detalle.component';
import { TopRatingsComponent } from './top-ratings/top-ratings.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PhoneCardComponent,
    PhoneGridComponent,
    DetalleComponent,
    TopRatingsComponent,
    AvatarSelectorComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    IonicRatingModule,
    RouterModule
  ],
  exports:
  [
    PhoneGridComponent,
    DetalleComponent,
    AvatarSelectorComponent,
    PhoneCardComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
