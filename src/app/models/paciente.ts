import { Usuario } from './usuario';

export class Paciente {
  id: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  activo: boolean;
  usuario: Usuario;
}
