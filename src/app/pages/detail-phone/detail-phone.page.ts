import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhonesService } from '../../services/phones.service';
import { Location } from '@angular/common';
import { Phone, Rating } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { VotacionComponent } from '../../components/votacion/votacion.component';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { RatingsService } from '../../services/ratings.service';

@Component({
  selector: 'app-detail-phone',
  templateUrl: './detail-phone.page.html',
  styleUrls: ['./detail-phone.page.scss'],
})
export class DetailPhonePage implements OnInit {

  data: any;
  phone: Phone;
  avatarSlide = {
    slidesPerView: 3.5
  };
  rating = {};

  constructor(private route: ActivatedRoute, private location: Location,
              private router: Router, private phoneService: PhonesService,
              private modalController: ModalController,
              private usuarioService: UsuarioService,
              private uiService: UiServiceService,
              private ratingService: RatingsService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.value;
        this.phone = this.data;

      }
    });

    if (this.usuarioService.token === null) {
      this.uiService.presentToast('Redirección controlada a inicio..');
      this.regresar();
    }
  }

  ngOnInit() {

    if (this.phone === undefined) {
      this.phone = this.phoneService.getPhone();
    }
    if (this.phone === undefined) {
      this.regresar();
    }
    const data: any = this.usuarioService.getUsuario();
    if (data.usuario !== undefined) {

      this.ratingService.comprobarVotaciones(this.phone._id, data.usuario._id)
        .subscribe(res => {
          if (res !== null) {
            this.rating = res;
          }
        });
    }

  }

  regresar() {
    this.phoneService.eliminarPhoneStorage();
    this.location.back();
  }

  async abrirModalComentario() {
    const modal = await this.modalController.create({
      component: VotacionComponent,
      componentProps: {
        phone: this.phone,
        rating: this.rating
      },
      cssClass: 'myModal'
    });

    modal.onDidDismiss()
      .then((res) => {
        if ( res. data ) {
          const data = res.data;
          console.log('respuesta', data.rating);
        }
    });

    return await modal.present();

  }
}
