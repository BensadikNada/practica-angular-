import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProyectoService } from '../../../core/services/proyecto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proyectos',
  imports: [FormsModule],
  templateUrl: './crear-proyecto.html',
  styleUrl: './crear-proyecto.scss',
})
export class CrearProyecto {
  nuevoProyecto = {
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    empleadoId: [] as number[],
    tareaId: [] as number[],
  };

  constructor(
    private proyectoService: ProyectoService,
    private router: Router,
  ) {}

  crearProyecto(): void {
    const fechaInicio = new Date(this.nuevoProyecto.fechaInicio);
    const fechaFin = new Date(this.nuevoProyecto.fechaFin);

    if (fechaFin < fechaInicio) {
      Swal.fire({
        title: 'Fechas no válidas',
        text: 'La fecha estimada de fin no puede ser anterior a la fecha de inicio.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6b5fa4',
      });

      return;
    }

    this.proyectoService.addProyecto({
      ...this.nuevoProyecto,
      fechaInicio,
      fechaFin,
    });

    this.router.navigate(['/proyectos']);
  }

  cancelar(): void {
    this.router.navigate(['/proyectos']);
  }
}
