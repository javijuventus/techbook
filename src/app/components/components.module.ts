import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneCardComponent } from './phone-card/phone-card.component';
import { PhoneGridComponent } from './phone-grid/phone-grid.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { IonicRatingModule } from 'ionic4-rating';
import { DetalleComponent } from './detalle/detalle.component';
import { TopRatingsComponent } from './top-ratings/top-ratings.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  entryComponents: [
    DetalleComponent,
    LoginComponent
  ],
  declarations: [
    PhoneCardComponent,
    PhoneGridComponent,
    DetalleComponent,
    TopRatingsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    IonicRatingModule
  ],
  exports:
  [
    PhoneGridComponent,
    DetalleComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
