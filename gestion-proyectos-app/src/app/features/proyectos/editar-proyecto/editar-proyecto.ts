import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../../core/services/proyecto';

@Component({
  selector: 'app-editar-proyecto',
  imports: [FormsModule],
  templateUrl: './editar-proyecto.html',
  styleUrl: './editar-proyecto.scss',
})
export class EditarProyecto {
  proyectoId!: number;

  proyecto = {
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    empleadoId: [] as number[],
    tareaId: [] as number[],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proyectoService: ProyectoService
  ) {}

  ngOnInit(): void {
    this.proyectoId = Number(this.route.snapshot.paramMap.get('id'));

    const proyectoExistente =
      this.proyectoService.getProyectoById(this.proyectoId);

    if (!proyectoExistente) {
      this.router.navigate(['/proyectos']);
      return;
    }

    this.proyecto = {
      nombre: proyectoExistente.nombre,
      descripcion: proyectoExistente.descripcion,
      fechaInicio: this.formatDate(proyectoExistente.fechaInicio),
      fechaFin: this.formatDate(proyectoExistente.fechaFin),
      empleadoId: proyectoExistente.empleadoId,
      tareaId: proyectoExistente.tareaId
    };
  }

  private formatDate(fecha: Date | string): string {
    const date = new Date(fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  guardarCambios(): void {
    const fechaInicio = new Date(this.proyecto.fechaInicio);
    const fechaFin = new Date(this.proyecto.fechaFin);

    if (fechaFin < fechaInicio) {
      alert('La fecha estimada de fin no puede ser anterior a la fecha de inicio.');
      return;
    }

    this.proyectoService.updateProyecto(this.proyectoId, {
      ...this.proyecto,
      fechaInicio,
      fechaFin
    });

    this.router.navigate(['/proyectos']);
  }

  cancelar(): void {
    this.router.navigate(['/proyectos']);
  }
}
