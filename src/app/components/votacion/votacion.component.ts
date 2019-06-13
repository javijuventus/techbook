import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { Rating, Phone } from 'src/app/interfaces/interfaces';
import { NgForm, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RatingsService } from '../../services/ratings.service';
import { PhonesService } from '../../services/phones.service';
import { UiServiceService } from '../../services/ui-service.service';
import { RatingsValidator } from '../../validators/ratings';

@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.scss'],
})
export class VotacionComponent implements OnInit {

  formEmitirVoto: FormGroup;
  phoneId: string;
  phone: Phone;
  newRating: Rating;
  submitAttempt = false;

  constructor(private navParams: NavParams,
              private ratingService: RatingsService,
              private modalController: ModalController,
              private phoneService: PhonesService,
              private uiService: UiServiceService,
              public formBuilder: FormBuilder) {
    this.newRating = {
      post: '',
      positivo: false,
      negativo: false,
      val_pantalla: 1,
      val_cpu: 1,
      val_aspecto: 1,
      val_camara: 1,
      val_bateria: 1
    };

    // tslint:disable-next-line:align
    this.formEmitirVoto = formBuilder.group({
      post: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      positivo: [''],
      negativo: [''],
      pantalla: [''],
      bateria: [''],
      aspecto: [''],
      cpu: [''],
      camara: ['']
    });
  }

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
    this.submitAttempt = true;
    if (this.formEmitirVoto.valid) {
      this.comprobarCheckBoxValue();
      this.submitAttempt = false;
      await this.ratingService.crearRating(this.newRating).then((res) => {
        this.ratingService.nuevoRating.emit(this.newRating);
        this.ratingService.updateRating(this.newRating);
        this.uiService.presentToast('Voto emitido correctamente');
        this.modalController.dismiss({
          rating: this.newRating
        });
      }).catch(err => {
        this.uiService.alertaInformativa('Fallo inesperado al guardar');
      });
    } else {
      this.uiService.alertaInformativa('Error en el formulario. Revise todos los campos');
    }
  }
  async updateVoto() {
    this.submitAttempt = true;
    if (this.formEmitirVoto.valid) {
      this.comprobarCheckBoxValue();
      console.log(this.newRating);
      this.submitAttempt = false;
      await this.ratingService.updateRating(this.newRating)
       .subscribe(data => {
         this.ratingService.actualizarMedias(this.phoneId);
         this.uiService.presentToast('Voto modificado correctamente');
         this.ratingService.nuevoRating.emit(this.newRating);
         this.modalController.dismiss({
           rating: this.newRating
         });
       });
    } else {
      this.uiService.alertaInformativa('Error en el formulario. Revise todos los campos');
    }
  }

  onChangeHandler(event) {

    const data = event.target.value;
    console.log('data', data);
    if (data) {
      this.newRating.positivo = true;
      this.newRating.negativo = false;
    } else {
      this.newRating.positivo = true;
      this.newRating.negativo = false;
    }
  }

  comprobarCheckBoxValue( ) {

    if (this.newRating.positivo === null || this.newRating.positivo === undefined ) {
      this.newRating.positivo = false;
    } else if ( this.newRating.negativo === null || this.newRating.negativo === undefined ) {
      this.newRating.negativo = false;
    }
  }

  regresar() {
    this.formEmitirVoto.reset();
    this.modalController.dismiss();
  }

}
