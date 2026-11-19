
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Proyecto } from '../../../models/proyecto.model';
import { Empleado } from '../../../models/empleado.model';
import { Tarea } from '../../../models/tarea.model';

import { ProyectoService } from '../../../core/services/proyecto';
import { EmpleadoService } from '../../../core/services/empleado';
import { TareaService } from '../../../core/services/tarea';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-detalle-proyecto',
  imports: [DatePipe, RouterLink],
  templateUrl: './detalle-proyecto.html',
  styleUrl: './detalle-proyecto.scss',
})
export class DetalleProyecto implements OnInit {
  proyecto?: Proyecto;

  empleadosAsignados: Empleado[] = [];
  tareasAsociadas: Tarea[] = [];

  esAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proyectoService: ProyectoService,
    private empleadoService: EmpleadoService,
    private tareaService: TareaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.proyecto = this.proyectoService.getProyectoById(id);

    this.esAdmin = this.authService.isAdmin();

    if (!this.proyecto) {
      this.router.navigate(['/proyectos']);
      return;
    }

    // Get employees assigned to this project
    this.empleadosAsignados = this.empleadoService
      .getEmpleados()
      .filter(empleado => empleado.proyectosId.includes(id));

    // Get tasks associated with this project
    this.tareasAsociadas = this.tareaService
      .getTareas()
      .filter(tarea => tarea.proyectoId === id);
  }
}
