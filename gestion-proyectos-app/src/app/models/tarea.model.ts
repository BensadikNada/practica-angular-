export type TareaEstado = 'pendiente' | 'en-progreso' | 'completada';

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: TareaEstado;
  fechaInicio: Date;
  fechaFin?: Date;
  empleadoId?: number;
  proyectoId: number;
}
