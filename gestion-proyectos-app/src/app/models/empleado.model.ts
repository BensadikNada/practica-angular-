export interface Empleado {
    id: number;
    nombreCompleto: string;
    correoElectronico: string;
    puesto: string;
    proyectosId: number[];
    tareasId: number[];
}
