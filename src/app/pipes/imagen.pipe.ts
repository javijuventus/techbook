import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from '../services/usuario.service';
import { HttpHeaders } from '@angular/common/http';

const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: any, phoneId: string): string {

    return `${ URL }/phones/imagen/${ phoneId }/${ img }`;
  }

}
