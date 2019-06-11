import { Consulta } from './consulta';
import { Usuario } from './usuario';
import { TipoExamen } from './tipo-examen';
export class Examen {
    id: number;
    fecha: string;
    archivo: string;

    tipoExamen: TipoExamen;
    consulta: Consulta;
    usuario: Usuario; //Doctor
}
