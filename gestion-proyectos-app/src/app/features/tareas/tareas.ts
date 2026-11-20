import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideEye, LucidePencil, LucidePlus, LucideTrash } from '@lucide/angular';
import { TareaService } from '../../core/services/tarea';
import { ProyectoService } from '../../core/services/proyecto';
import { AuthService } from '../../core/services/auth';
import { Tarea, TareaEstado } from '../../models/tarea.model';
import Swal from 'sweetalert2';
import Toastify from 'toastify-js';
import { EmpleadoService } from '../../core/services/empleado';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  imports: [DatePipe, RouterLink, LucidePlus, LucideEye, LucidePencil, LucideTrash, FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.scss',
})
export class Tareas implements OnInit {
  tareas: Tarea[] = [];
  esAdmin = false;

  constructor(
    private tareaService: TareaService,
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private empleadoService: EmpleadoService,
  ) {}

  cargarTareas(): void {
    const todasLasTareas = this.tareaService.getTareas();

    if (this.esAdmin) {
      this.tareas = [...todasLasTareas];
      return;
    }

    const empleadoId = this.authService.getCurrentUser()?.empleadoId;

    if (!empleadoId) {
      this.tareas = [];
      return;
    }

    const empleado = this.empleadoService.getEmpleadoById(empleadoId);

    this.tareas = todasLasTareas.filter(
      (tarea) => empleado?.tareasId.includes(tarea.id) || tarea.empleadoId === empleadoId,
    );
  }

  ngOnInit(): void {
    this.esAdmin = this.authService.isAdmin();
    this.cargarTareas();
  }

  getNombreProyecto(proyectoId: number): string {
    return this.proyectoService.getProyectoById(proyectoId)?.nombre ?? 'Proyecto no encontrado';
  }

  cambiarEstado(tarea: Tarea, nuevoEstado: TareaEstado): void {
    const tareaActualizada = {
      ...tarea,
      estado: nuevoEstado,
    };

    const { id, ...datosTarea } = tareaActualizada;
    this.tareaService.updateTarea(id, datosTarea);
    this.tareas = this.tareas.map((t) => (t.id === id ? tareaActualizada : t));

    Toastify({
      text: '¡Estado de la tarea actualizado!',
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      style: {
        background: '#6b5fa4',
        borderRadius: '8px',
      },
    }).showToast();
  }

  async eliminarTarea(id: number): Promise<void> {
    const resultado = await Swal.fire({
      title: '¿Eliminar tarea?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c45151',
      cancelButtonColor: '#6b5fa4',
    });

    if (resultado.isConfirmed) {
      this.tareaService.deleteTarea(id);
      this.cargarTareas();
      this.cdr.detectChanges();

      Toastify({
        text: '¡Tarea eliminada correctamente!',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        close: true,
        style: {
          background: '#6b5fa4',
          borderRadius: '8px',
        },
      }).showToast();
    }
  }
}
