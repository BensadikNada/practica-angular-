
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TareaEstado } from '../../../models/tarea.model';
import { TareaService } from '../../../core/services/tarea';
import { ProyectoService } from '../../../core/services/proyecto';

import Swal from 'sweetalert2';
import Toastify from 'toastify-js';
import { Proyecto } from '../../../models/proyecto.model';

@Component({
  selector: 'app-editar-tarea',
  imports: [FormsModule],
  templateUrl: './editar-tarea.html',
  styleUrl: './editar-tarea.scss',
})
export class EditarTarea implements OnInit {
  tareaId!: number;
  proyectos: Proyecto[] = [];

  tarea = {
    titulo: '',
    descripcion: '',
    estado: 'pendiente' as TareaEstado,
    fechaInicio: '',
    fechaFin: '',
    empleadoId: undefined as number | undefined,
    proyectoId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareaService: TareaService,
    private proyectoService: ProyectoService
  ) {}

  ngOnInit(): void {
    this.tareaId = Number(this.route.snapshot.paramMap.get('id'));
    this.proyectos = this.proyectoService.getProyectos();

    const tareaExistente = this.tareaService.getTareaById(this.tareaId);

    if (!tareaExistente) {
      this.router.navigate(['/tareas']);
      return;
    }

    this.tarea = {
      titulo: tareaExistente.titulo,
      descripcion: tareaExistente.descripcion,
      estado: tareaExistente.estado,
      fechaInicio: this.formatDate(tareaExistente.fechaInicio),
      fechaFin: tareaExistente.fechaFin
        ? this.formatDate(tareaExistente.fechaFin)
        : '',
      empleadoId: tareaExistente.empleadoId,
      proyectoId: tareaExistente.proyectoId
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
    const fechaInicio = new Date(`${this.tarea.fechaInicio}T00:00:00`);
    const fechaFin = this.tarea.fechaFin
      ? new Date(`${this.tarea.fechaFin}T00:00:00`)
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

    this.tareaService.updateTarea(this.tareaId, {
      ...this.tarea,
      fechaInicio,
      fechaFin
    });

    Toastify({
      text: '¡Tarea actualizada correctamente!',
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
