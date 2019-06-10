import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaMovil, Phone } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  paginaPhones = 0;

  categoriaActual;
  private phone: Phone;
  nuevoPhone = new EventEmitter<Phone>();

  constructor(private http: HttpClient, private storage: Storage,  private navCtrl: NavController) {
    this.categoriaActual = 'Top Valorados';
  }

  getAllPhones() {
    return this.http.get<RespuestaMovil>(`${URL}/phones/popular`);
  }

  getTopHeadlinesCategoria(categoria: string, phoneId?: string) {
    if (this.categoriaActual === categoria) {
      this.paginaPhones++;
    } else {
      this.paginaPhones = 1;
      this.categoriaActual = categoria;
    }
    let query = 'phones/popular';

    switch (categoria) {

      case 'Top Valorados':
        query = 'phones/popular';
        break;
      case 'Top Nuevos':
        query = 'phones/latest';
        break;
      case 'Top Likes':
        query = 'phones/likes';
        break;
      case 'Top Dislikes':
        query = 'phones/dislikes';
        break;
      case 'Top Cámara':
        query = 'phones/camara';
        break;
      case 'Top CPU':
        query = 'phones/cpu';
        break;
      case 'Top Pantalla':
        query = 'phones/pantalla';
        break;
      case 'Top Diseño':
        query = 'phones/aspecto';
        break;
      case 'Top Batería':
        query = 'phones/bateria';
        break;
      default:
        query = 'phones/popular';
    }
    return this.http.get<RespuestaMovil>(`${URL}/${query}/?pagina=${this.paginaPhones}`);
  }

  getPhoneDetalle(id: string) {

    return this.http.get<Phone>(`${URL}/phones/${id}`);
  }

  buscarPorMarca(marca: string) {

    const postData = new FormData();
    postData.append('query', marca);
    return new Promise((resolve, reject) => {
      this.http.post<RespuestaMovil>(`${URL}/phones/buscar/marca`, postData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  buscarPorModelo(modelo: string) {
    const postData = new FormData();
    postData.append('query', modelo);
    return new Promise((resolve, reject) => {
      this.http.post<RespuestaMovil>(`${URL}/phones/buscar/modelo`, postData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });


  }

  getPhone() {
    if (this.phone._id) {
      this.validaPhone();
    }
    return  this.phone ;

  }
  async eliminarPhoneStorage() {

    this.storage.remove('phone');
  }

  async guardarPhone(phone: Phone) {

    this.phone = phone;
    await this.storage.set('phone', phone);

    await this.validaPhone();

  }

  async cargarPhone() {  // Leerlo del storage
    this.phone = await this.storage.get('phone') || null;
  }

  async validaPhone(): Promise<boolean> {

    await this.cargarPhone();

    if (!this.phone) {
      this.navCtrl.navigateRoot('main/tabs/tab1');
      return Promise.resolve(false);
    } else {
      return Promise.resolve(true);
    }
  }
}
/*crearPhone( phone ) {
  const headers = new HttpHeaders({
    'x-token': this.usuarioService.token
  });

  return new Promise( resolve => {
    this.http.phone(`${ URL }/phones`, phone, { headers})
    .subscribe( resp => {
      // tslint:disable-next-line:no-string-literal
      this.nuevoPhone.emit( resp['phone'] );
      resolve( true );
    });

  });
}

subirImagen( img: string) {

  const options: FileUploadOptions = {
    fileKey: 'image',
    headers: {
      'x-token': this.usuarioService.token
    }
  };

  const fileTransfer: FileTransferObject = this.fileTransfer.create();

  fileTransfer.upload( img, `${ URL }/phones/upload`, options )
      .then( data => {
        console.log(data);
      }).catch( err => {
        console.log('error al cargar la foto', err);
      });
}*/
