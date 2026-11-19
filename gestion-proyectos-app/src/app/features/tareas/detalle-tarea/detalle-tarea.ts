
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TareaService } from '../../../core/services/tarea';
import { ProyectoService } from '../../../core/services/proyecto';
import { AuthService } from '../../../core/services/auth';
import { EmpleadoService } from '../../../core/services/empleado';

import { Tarea } from '../../../models/tarea.model';

@Component({
  selector: 'app-detalle-tarea',
  imports: [DatePipe, RouterLink],
  templateUrl: './detalle-tarea.html',
  styleUrl: './detalle-tarea.scss',
})
export class DetalleTarea implements OnInit {
  tarea?: Tarea;
  nombreProyecto = '';
  authAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareaService: TareaService,
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const tareaEncontrada = this.tareaService.getTareaById(id);

    this.authAdmin = this.authService.isAdmin();

    // Check whether the task exists
    if (!tareaEncontrada) {
      this.router.navigate(['/tareas']);
      return;
    }

    // Check employee permissions
    if (!this.authAdmin) {
      const empleadoId = this.authService.getCurrentUser()?.empleadoId;

      const empleado = empleadoId
        ? this.empleadoService.getEmpleadoById(empleadoId)
        : undefined;

      // Employees can only see their assigned tasks
      if (!empleado || !empleado.tareasId.includes(tareaEncontrada.id)) {
        this.router.navigate(['/tareas']);
        return;
      }
    }

    // Load task details
    this.tarea = tareaEncontrada;

    // Load associated project name
    this.nombreProyecto =
      this.proyectoService.getProyectoById(tareaEncontrada.proyectoId)?.nombre ??
      'Proyecto no encontrado';
  }
}
