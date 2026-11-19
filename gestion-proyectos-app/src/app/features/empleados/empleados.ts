import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Empleado } from '../../models/empleado.model';
import { EmpleadoService } from '../../core/services/empleado';
import { LucidePlus, LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';
import Swal from 'sweetalert2';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-empleados',
  imports: [RouterLink, LucidePlus, LucideEye, LucidePencil, LucideTrash],
  templateUrl: './empleados.html',
  styleUrl: './empleados.scss',
})
export class Empleados implements OnInit {
  empleados: Empleado[] = [];

  constructor(
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleados = [...this.empleadoService.getEmpleados()];
  }

  async eliminarEmpleado(id: number): Promise<void> {
    const resultado = await Swal.fire({
      title: '¿Eliminar empleado?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c45151',
      cancelButtonColor: '#6b5fa4',
    });

    if (resultado.isConfirmed) {
      this.empleadoService.deleteEmpleado(id);
      this.cargarEmpleados();
      this.cdr.detectChanges();
      Toastify({
        text: '¡Empleado eliminado correctamente!',
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
