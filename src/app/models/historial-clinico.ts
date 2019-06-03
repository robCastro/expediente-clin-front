import { Enfermedad } from './enfermedad';
import { Paciente } from './paciente';

export class HistorialClinico {
  id: number;
  fecha: string;
  activo: boolean;

  enfermedad: Enfermedad;
  paciente: Paciente;
}
