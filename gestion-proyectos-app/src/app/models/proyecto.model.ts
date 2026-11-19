export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  empleadoId: number[];
  tareaId: number[];
}