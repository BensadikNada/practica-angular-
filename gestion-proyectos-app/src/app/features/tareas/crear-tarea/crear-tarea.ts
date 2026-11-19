
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TareaEstado } from '../../../models/tarea.model';
import { TareaService } from '../../../core/services/tarea';
import { ProyectoService } from '../../../core/services/proyecto';

import Swal from 'sweetalert2';
import Toastify from 'toastify-js';
import { Proyecto } from '../../../models/proyecto.model';

@Component({
  selector: 'app-crear-tarea',
  imports: [FormsModule],
  templateUrl: './crear-tarea.html',
  styleUrl: './crear-tarea.scss',
})
export class CrearTarea implements OnInit {
  proyectos: Proyecto[] = [];

  nuevaTarea = {
    titulo: '',
    descripcion: '',
    estado: 'pendiente' as TareaEstado,
    fechaInicio: '',
    fechaFin: '',
    empleadoId: undefined as number | undefined,
    proyectoId: 0
  };

  constructor(
    private tareaService: TareaService,
    private proyectoService: ProyectoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proyectos = this.proyectoService.getProyectos();
  }

  crearTarea(): void {
    if (this.proyectos.length === 0) {
      Swal.fire({
        title: 'No hay proyectos',
        text: 'Debes crear un proyecto antes de registrar una tarea.',
        icon: 'warning',
        confirmButtonColor: '#6b5fa4'
      });
      return;
    }

    const fechaInicio = new Date(`${this.nuevaTarea.fechaInicio}T00:00:00`);
    const fechaFin = this.nuevaTarea.fechaFin
      ? new Date(`${this.nuevaTarea.fechaFin}T00:00:00`)
      : undefined;

    if (fechaFin && fechaFin < fechaInicio) {
      Swal.fire({
        title: 'Fechas no válidas',
        text: 'La fecha de entrega no puede ser anterior a la fecha de creación.',
        icon: 'error',
        confirmButtonColor: '#6b5fa4'
      });
      return;
    }

    this.tareaService.addTarea({
      ...this.nuevaTarea,
      fechaInicio,
      fechaFin
    });

    Toastify({
      text: '¡Tarea creada correctamente!',
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#6b5fa4',
        borderRadius: '8px'
      }
    }).showToast();

    this.router.navigate(['/tareas']);
  }

  cancelar(): void {
    this.router.navigate(['/tareas']);
  }
}
