import { Hospital } from './hospital';
import { Municipio } from './municipio';
import { Pais } from './pais';
import { Genero } from './genero';
import { EstadoCivil } from './estado-civil';
import { Rol } from './rol';
import { Especialidad } from './especialidad';

export class Usuario {
    id: number;
    username: string;
    password: string;
    enabled: boolean;
    nombres: string;
    apellidos: string;
    fecha: string;
    detalle: string;
    email: string;
    telefono: string;

    hospital: Hospital;
    municipio: Municipio;
    pais: Pais;
    genero: Genero;
    estadoCivil: EstadoCivil;
    roles: string[]= [];
    especialidad: Especialidad;
}
