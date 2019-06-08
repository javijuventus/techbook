import { Component, OnInit, Input } from '@angular/core';
import { PhonesService } from '../../services/phones.service';
import { ModalController } from '@ionic/angular';
import { Phone } from 'src/app/interfaces/interfaces';
import { RespuestaMovil } from '../../interfaces/interfaces';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() phone;

  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('Estoy en modal detalle');
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
