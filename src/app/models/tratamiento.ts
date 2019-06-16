import { Consulta } from './consulta';
import { Medicamento } from './medicamento';

export class Tratamiento {
    id: number;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    frecuencia: string;
    dosis: string;

    consulta: Consulta;
    medicamento: Medicamento;
}
