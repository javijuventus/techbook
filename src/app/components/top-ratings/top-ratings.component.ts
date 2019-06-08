import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';
import { Phone } from 'src/app/interfaces/interfaces';
import { PhonesService } from '../../services/phones.service';
import { RespuestaMovil } from '../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-ratings',
  templateUrl: './top-ratings.component.html',
  styleUrls: ['./top-ratings.component.scss'],
})
export class TopRatingsComponent implements OnInit {

  @Input() phone;
  @Input() catSel: string;


  constructor( private router: Router) { }

  ngOnInit() {}




}
