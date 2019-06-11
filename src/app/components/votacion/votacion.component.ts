import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { Rating, Phone } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { RatingsService } from '../../services/ratings.service';
import { PhonesService } from '../../services/phones.service';
import { UiServiceService } from '../../services/ui-service.service';
import { UsuarioService } from '../../services/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.scss'],
})
export class VotacionComponent implements OnInit {

  // @Input() phoneId: string;

  phoneId: string;
  phone: Phone;
  newRating: Rating = {
    post : '',
    positivo: false,
    negativo: false,
    val_pantalla : 0,
    val_cpu: 0,
    val_aspecto: 0,
    val_camara: 0,
    val_bateria: 0
  };

  constructor( private navParams: NavParams,
               private ratingService: RatingsService,
               private modalController: ModalController,
               private phoneService: PhonesService,
               private uiService: UiServiceService ) {}

  ngOnInit() {
    this.phone = this.navParams.get('phone');
    this.newRating = this.navParams.get('rating');
    this.phoneId = this.phone._id;
    if (this.phoneId === undefined) {
      const phone = this.phoneService.getPhone();
      this.phoneId = phone._id;
    }
    this.newRating.phone = this.phoneId;
  }

  async emitirVoto() {

    await this.ratingService.crearRating( this.newRating ).then( res => {
      this.uiService.presentToast('Voto emitido correctamente');
      this.modalController.dismiss({
      rating: this.newRating
      });
    }).catch( err => {
      this.uiService.alertaInformativa('Fallo inesperado al guardar');
    });
}
async updateVoto() {

  await this.ratingService.updateRating( this.newRating )
    .subscribe(data => {
      this.uiService.presentToast('Voto modificado correctamente');
      this.modalController.dismiss({
      rating: this.newRating
      });
    });
}

onChangeHandler( event) {

  const data = event.target.value;
  if (data) {
    this.newRating.positivo = true;
    this.newRating.negativo = false;
  } else {
    this.newRating.negativo = true;
    this.newRating.negativo = false;
  }
}

regresar() {
  this.modalController.dismiss();
}

}
