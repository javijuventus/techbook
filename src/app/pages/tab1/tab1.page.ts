import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PhonesService } from '../../services/phones.service';
import { Phone } from '../../interfaces/interfaces';
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

  categorias = ['Novedades', 'Top Likes', 'Top Dislikes', 'Top Cámara', 'Top CPU', 'Top Pantalla', 'Top Diseño', 'Top Batería'];

  categoriaActual;

  @Output() categoria = new EventEmitter<string>();
  phones: Phone[] = [];
  habilitado = true;
  refresh = true;

  constructor(private phonesService: PhonesService) { }

  ngOnInit() {
    this.segment.value = this.categorias[1];
    this.categoriaActual = this.categorias[1];

    this.cargarPhones(this.categorias[1]);
  }

  loadData(event) {
    this.cargarPhones(this.segment.value, event);

  }

  cambioCategoria(event) {
    this.categoriaActual = event.detail.value;
    this.phones = [];
    this.infiniteScroll.disabled = false;
    this.cargarPhones(this.categoriaActual);
    this.categoria.emit(this.categoriaActual);
    this.content.scrollToTop();
  }

  cargarPhones(categoria: string, event?) {
    this.phonesService.getTopHeadlinesCategoria(this.categoriaActual).subscribe(data => {
      this.phones.push(...data.phones);
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

  recargar(event?) {
    this.phones = [];
    this.phonesService.paginaPhones = 0;
    this.cargarPhones(this.categoriaActual, event);
    this.refresh = false;
    setTimeout(() => {
      this.refresh = true;
    }, 3000);

  }

}
