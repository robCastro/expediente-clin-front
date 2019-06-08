import { Consulta } from './consulta';

export class Tratamiento {
    id: number;
    nombre: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    frecuencia: string;
    dosis: string;

    consulta: Consulta;
}
