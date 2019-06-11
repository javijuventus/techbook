export interface RespuestaRatings {
  _id: string;
  post: string;
  positivo: boolean;
  negativo: boolean;
  val_pantalla: number;
  val_cpu: number;
  val_aspecto: number;
  val_camara: number;
  val_bateria: number;
  phone: string;
  usuario?: Usuario;
  created: string;
  __v: number;
}

export interface Usuario {
  avatar: string;
  _id: string;
  nombre: string;
  email: string;
  __v: number;
}
