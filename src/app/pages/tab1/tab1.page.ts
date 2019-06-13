import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { PhonesService } from '../../services/phones.service';
import { Phone, RespuestaMovil } from '../../interfaces/interfaces';
import { IonSegment, IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  // tslint:disable-next-line:max-line-length
  categorias = ['Top Valorados', 'Top Nuevos', 'Top Likes', 'Top Dislikes', 'Top Cámara', 'Top CPU', 'Top Pantalla', 'Top Diseño', 'Top Batería'];

  phones: Phone[] = [];
  habilitado = true;
  refresh = true;

  @Input() categoria: string;

  constructor(private phonesService: PhonesService) { }

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.categoria = this.segment.value;
    this.cargarPhones(this.categorias[0]);
  }

  loadData(event) {
    this.cargarPhones(this.segment.value, event);

  }

  cambioCategoria( event ) {
    this.phones = [];
    this.categoria = event.detail.value;
    this.infiniteScroll.disabled = false;
    this.cargarPhones(event.detail.value);
    this.content.scrollToTop();
  }

  cargarPhones(categoria: string, event?) {
    this.phonesService.getTopHeadlinesCategoria(this.categoria).subscribe((data: RespuestaMovil) => {
      this.phones.push(...data.phones);
      console.log(this.phones);
      if (data.phones.length === 0 && event !== undefined) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      if (event) {
        event.target.complete();
      }
    });
  }

  recargar(event?) {
    this.phones = [];
    this.phonesService.paginaPhones = 0;
    this.cargarPhones(this.categoria, event);
    this.refresh = false;
    setTimeout(() => {
      this.refresh = true;
    }, 3000);

  }

}
