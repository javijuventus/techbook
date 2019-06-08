import { Component, OnInit, Input } from '@angular/core';
import { Phone, Camara } from '../../interfaces/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PhonesService } from '../../services/phones.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-detail-phone',
  templateUrl: './detail-phone.page.html',
  styleUrls: ['./detail-phone.page.scss'],
})
export class DetailPhonePage implements OnInit {

  data: any;
  phone;
  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor(private route: ActivatedRoute,
              private router: Router) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.phone;
        console.log('data', this.data);
        this.phone = this.data;
      }
    });
  }

  ngOnInit() {
    
  }

  regresar() {
    this.router.navigate(['']);
  }

}
