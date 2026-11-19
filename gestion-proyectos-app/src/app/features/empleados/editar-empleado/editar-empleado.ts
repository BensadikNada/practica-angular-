
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../../models/empleado.model';
import { Proyecto } from '../../../models/proyecto.model';
import { Tarea } from '../../../models/tarea.model';
import { EmpleadoService } from '../../../core/services/empleado';
import { ProyectoService } from '../../../core/services/proyecto';
import { TareaService } from '../../../core/services/tarea';
import Swal from 'sweetalert2';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-editar-empleado',
  imports: [FormsModule],
  templateUrl: './editar-empleado.html',
  styleUrl: './editar-empleado.scss',
})
export class EditarEmpleado implements OnInit {
  empleadoId = 0;
  proyectos: Proyecto[] = [];
  tareas: Tarea[] = [];

  empleado = {
    nombreCompleto: '',
    correoElectronico: '',
    puesto: '',
    proyectosId: [] as number[],
    tareasId: [] as number[],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private proyectoService: ProyectoService,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'));

    const empleadoEncontrado = this.empleadoService.getEmpleadoById(this.empleadoId);

    if (!empleadoEncontrado) {
      this.router.navigate(['/empleados']);
      return;
    }

    this.empleado = {
      nombreCompleto: empleadoEncontrado.nombreCompleto,
      correoElectronico: empleadoEncontrado.correoElectronico,
      puesto: empleadoEncontrado.puesto,
      proyectosId: [...empleadoEncontrado.proyectosId],
      tareasId: [...empleadoEncontrado.tareasId],
    };

    this.proyectos = this.proyectoService.getProyectos();
    this.tareas = this.tareaService.getTareas();
  }

  guardarCambios(): void {
    this.empleadoService.updateEmpleado(this.empleadoId, this.empleado);

    Toastify({
      text: '¡Empleado actualizado correctamente!',
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#6b5fa4',
        borderRadius: '8px',
      },
    }).showToast();

    this.router.navigate(['/empleados']);
  }

  cancelar(): void {
    this.router.navigate(['/empleados']);
  }
}
