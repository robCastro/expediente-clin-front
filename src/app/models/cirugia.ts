import { Consulta } from './consulta';
import { Usuario } from './usuario';

export class Cirugia {
    id: number;
    fecha: string;

    consulta: Consulta;
    usuario: Usuario; //Doctor.
}
