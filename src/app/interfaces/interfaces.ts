export interface RespuestaMovil {
  ok: boolean;
  pagina?: number;
  phones: Phone[];
  camara?: Camara;
}

export interface Phone {
  camara: Camara;
  img: any[];
  num_positivos: number;
  num_negativos: number;
  _id: string;
  marca: string;
  modelo: string;
  fechaLanzamiento: string;
  pantalla: string;
  cpu: string;
  ram: string;
  almacenamiento: string;
  bateria: string;
  valoraciones: Valoraciones;
  total?: number;
  created: string;
  __v: number;
}

export interface Camara {
  trasera1: string;
  trasera2?: string;
  delantera: string;
  trasera3?: string;
}

export interface Valoraciones {
  avg_camara: number;
  avg_pantalla: number;
  avg_aspecto: number;
  avg_bateria: number;
  avg_cpu: number;

}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  password?: string;
  email?: string;
}


