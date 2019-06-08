import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PhonesService } from '../../services/phones.service';
import { Phone, RespuestaMovil } from '../../interfaces/interfaces';
import { IonSegment, IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  categorias = ['Novedades', 'Top Likes', 'Top Dislikes', 'Top Cámara', 'Top CPU', 'Top Pantalla', 'Top Diseño', 'Top Batería'];

  @Output() categoria = new EventEmitter<string>();
  phones: Phone[] = [];
  habilitado = true;
  refresh = true;

  constructor(private phonesService: PhonesService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.segment.value = this.categorias[1];

    this.cargarPhones(this.categorias[1]);
  }

  loadData(event) {
    this.cargarPhones(this.segment.value, event);
  }

  cambioCategoria(event) {
    this.phones = [];
    this.infiniteScroll.disabled = false;
    this.cargarPhones(event.detail.value);
    console.log(event.detail.value);
    this.categoria.emit(event.detail.value);
    this.content.scrollToTop();
  }

  cargarPhones(categoria: string, event?) {

    this.phonesService.getTopHeadlinesCategoria(categoria).subscribe(data => {
      this.phones.push(...data.phones);
      console.log(data);
      if (data.phones.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      if (event) {
        event.target.complete();
      }
    });
  }

  siguientes(categoria: string, event?, pull: boolean = false) {

    this.phonesService.getTopHeadlinesCategoria(categoria, pull)
      .subscribe(res => {
        console.log(res);
        this.phones.push(...res.phones);

        if (event) {
          event.target.complete();
          if (res.phones.length === 0) {
            this.habilitado = false;
          }
        }
      });
  }
  recargar(categoria: string, event?) {
    this.phones = [];
    this.phonesService.paginaPhones = 0;
    this.habilitado = true;
    this.siguientes(categoria, event);
    this.refresh = false;
    setTimeout(() => {
      this.refresh = true;
    }, 3000);

  }

  async login() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
    });
    modal.present();
  }
}


