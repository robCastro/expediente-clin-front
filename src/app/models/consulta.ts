import { Paciente } from './paciente';
import { Usuario } from './usuario';
import { Enfermedad } from './enfermedad';

export class Consulta {
    id: number;
    fecha: string;
    hora: string;
    peso: number;
    temperatura: number;
    estatura: number;
    presion: string;
    ritmo: number;
    sintoma: string;

    paciente: Paciente;
    usuario: Usuario; //El doctor que hace la consulta.
    enfermedad: Enfermedad;
}
