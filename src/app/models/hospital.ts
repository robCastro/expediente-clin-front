import { Pais } from './pais';
import { Municipio } from './municipio';

export class Hospital {
    id: number;
    nombre: string;
    fecha: string;
    telefono: string;
    detalle: string;
    aprobado: boolean;
    activo: boolean;
    
    pais: Pais;
    municipio: Municipio;
}
