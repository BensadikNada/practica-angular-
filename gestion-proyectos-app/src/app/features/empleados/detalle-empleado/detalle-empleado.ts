
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empleado } from '../../../models/empleado.model';
import { EmpleadoService } from '../../../core/services/empleado';
import { ProyectoService } from '../../../core/services/proyecto';
import { TareaService } from '../../../core/services/tarea';

@Component({
  selector: 'app-detalle-empleado',
  imports: [RouterLink],
  templateUrl: './detalle-empleado.html',
  styleUrl: './detalle-empleado.scss',
})
export class DetalleEmpleado implements OnInit {
  empleado?: Empleado;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private proyectoService: ProyectoService,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.empleado = this.empleadoService.getEmpleadoById(id);

    if (!this.empleado) {
      this.router.navigate(['/empleados']);
    }
  }

  getNombreProyecto(id: number): string {
    return this.proyectoService.getProyectoById(id)?.nombre ?? 'Proyecto no encontrado';
  }

  getTituloTarea(id: number): string {
    return this.tareaService.getTareaById(id)?.titulo ?? 'Tarea no encontrada';
  }
}
