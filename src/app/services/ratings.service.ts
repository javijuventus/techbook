import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rating, RespuestaMovil, Phone } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';
import { PhonesService } from './phones.service';
import { RespuestaRatings } from '../interfaces/interfaces-ratings';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  paginaRatings = 0;
  nuevoRating = new EventEmitter<Rating>();

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

   getPosts(phoneId: string , pull: boolean = true) {

    if (pull) {
      this.paginaRatings = 0;
    }

    this.paginaRatings++;

    return this.http.get<RespuestaRatings>(`${URL}/ratings/phone/${phoneId}/?pagina=${this.paginaRatings}`);
  }

  crearRating(rating: Rating) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/ratings`, rating, { headers })
        .subscribe(resp => {
          // tslint:disable-next-line:no-string-literal
          this.nuevoRating.emit(resp['rating']);
          this.actualizarMedias(rating.phone);
          resolve(true);
        });
    });
  }

  async actualizarMedias(phoneId: string) {

    const categorias = ['pantalla', 'camara', 'bateria', 'aspecto', 'cpu'];

    await categorias.forEach(categoria => {

      return new Promise(async resolve => {
        await this.http.get(`${URL}/ratings/${categoria}/${phoneId}`)
          .subscribe(resp => {
            resolve(true);
          });
      });
    });
  }

  comprobarVotaciones(phoneId: string, userdId: string) {

    return this.http.get(`${URL}/ratings/${phoneId}/${userdId}`);
  }

   updateRating( rating: Rating ) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.post(`${URL}/ratings/update`, rating, { headers });
  }

}
