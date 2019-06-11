import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { RatingsService } from '../../services/ratings.service';
import { Rating } from 'src/app/interfaces/interfaces';
import { Phone, RespuestaMovil } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { RespuestaRatings } from '../../interfaces/interfaces-ratings';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {

  @Input() phone: Phone;

  habilitado = true;
  refresh = true;
  ratings;


  constructor(private ratingService: RatingsService ) { }

  ngOnInit(  ) {

    this.siguientes();
    this.ratingService.nuevoRating.subscribe( post => {
      this.ratings.unshift(post);
    });

    this.cargarComentarios(this.phone._id);
  }

  siguientes(event?, pull: boolean = false) {

    this.ratingService.getPosts(this.phone._id, pull)
      .subscribe(res => {
        this.ratings = res;

        if (event) {
          event.target.complete();
          if (res !== null) {
            this.habilitado = false;
          }
        }
      });
  }

  cargarComentarios( phoneId: string, event?) {
       this.ratingService.getPosts(phoneId).subscribe( ( data: RespuestaRatings) => {
        this.ratings = data;

        if (data === null && event !== undefined) {
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
    this.ratings = [];
    this.ratingService.paginaRatings = 0;
    this.cargarComentarios(this.phone._id, event);
    this.refresh = false;
    setTimeout(() => {
      this.refresh = true;
    }, 3000);

  }
  loadData(event) {
    this.cargarComentarios( this.phone._id, event);
  }

}
