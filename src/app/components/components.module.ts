import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneCardComponent } from './phone-card/phone-card.component';
import { PhoneGridComponent } from './phone-grid/phone-grid.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { IonicRatingModule } from 'ionic4-rating';
import { TopRatingsComponent } from './top-ratings/top-ratings.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { VotacionComponent } from './votacion/votacion.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  entryComponents: [
    ComentariosComponent,
    VotacionComponent
  ],
  declarations: [
    PhoneCardComponent,
    PhoneGridComponent,
    TopRatingsComponent,
    AvatarSelectorComponent,
    HeaderComponent,
    VotacionComponent,
    ComentariosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    IonicModule,
    PipesModule,
    IonicRatingModule,
    RouterModule,
    FormsModule
  ],
  exports:
  [
    PhoneGridComponent,
    AvatarSelectorComponent,
    PhoneCardComponent,
    HeaderComponent,
    ComentariosComponent,
  ]
})
export class ComponentsModule { }
