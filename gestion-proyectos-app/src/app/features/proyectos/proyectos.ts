import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto.model';
import { ProyectoService } from '../../core/services/proyecto';
import { FormsModule } from '@angular/forms';
import { LucideEye, LucidePencil, LucidePlus, LucideTrash } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import Toastify from 'toastify-js';
import { AuthService } from '../../core/services/auth';
import { EmpleadoService } from '../../core/services/empleado';

@Component({
  selector: 'app-proyecto',
  imports: [FormsModule, LucidePlus, RouterLink, DatePipe, LucideEye, LucidePencil, LucideTrash],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.scss',
})

// OnInit is an angular lifecycle hook, it lets you execute code
// when a component has finished being initialized
export class Proyectos implements OnInit {
  proyectos: Proyecto[] = [];
  esAdmin = false;

  constructor(
    private proyectoService: ProyectoService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private empleadoService: EmpleadoService,
  ) {}

  ngOnInit(): void {
    this.esAdmin = this.authService.isAdmin();

    const currentUser = this.authService.getCurrentUser();

    if (this.esAdmin) {
      this.proyectos = [...this.proyectoService.getProyectos()];
    } else if (currentUser?.empleadoId) {
      const empleado = this.empleadoService.getEmpleadoById(currentUser.empleadoId);

      this.proyectos = this.proyectoService
        .getProyectos()
        .filter((proyecto) => empleado?.proyectosId.includes(proyecto.id));
    }
  }

  async eliminarProyecto(id: number): Promise<void> {
    const resultado = await Swal.fire({
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c45151',
      cancelButtonColor: '#6b5fa4',
    });

    if (resultado.isConfirmed) {
      this.proyectoService.deleteProyecto(id);

      this.proyectos = [...this.proyectoService.getProyectos()];

      this.cdr.detectChanges();

      Toastify({
        text: '¡Proyecto eliminado correctamente!',
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
