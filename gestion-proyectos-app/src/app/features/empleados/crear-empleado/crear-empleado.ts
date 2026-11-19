
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../../core/services/empleado';
import { AuthService } from '../../../core/services/auth';
import { ProyectoService } from '../../../core/services/proyecto';
import { TareaService } from '../../../core/services/tarea';
import { Proyecto } from '../../../models/proyecto.model';
import { Tarea } from '../../../models/tarea.model';
import Swal from 'sweetalert2';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-crear-empleado',
  imports: [FormsModule],
  templateUrl: './crear-empleado.html',
  styleUrl: './crear-empleado.scss',
})
export class CrearEmpleado implements OnInit {
  proyectos: Proyecto[] = [];
  tareas: Tarea[] = [];

  nuevoEmpleado = {
    nombreCompleto: '',
    correoElectronico: '',
    puesto: '',
    proyectosId: [] as number[],
    tareasId: [] as number[],
  };

  username = '';
  password = '';

  constructor(
    private empleadoService: EmpleadoService,
    private authService: AuthService,
    private proyectoService: ProyectoService,
    private tareaService: TareaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proyectos = this.proyectoService.getProyectos();
    this.tareas = this.tareaService.getTareas();
  }

  crearEmpleado(): void {
    if (this.password.length < 6) {
      Swal.fire({
        title: 'Contraseña no válida',
        text: 'La contraseña debe tener al menos 6 caracteres.',
        icon: 'error',
        confirmButtonColor: '#6b5fa4',
      });
      return;
    }

    this.empleadoService.addEmpleado(this.nuevoEmpleado);

    const empleados = this.empleadoService.getEmpleados();
    const nuevoId = Math.max(...empleados.map(e => e.id));

    const cuentaCreada = this.authService.addEmployeeUser(
      this.username,
      this.password,
      nuevoId
    );

    if (!cuentaCreada) {
      this.empleadoService.deleteEmpleado(nuevoId);

      Swal.fire({
        title: 'Nombre de usuario no disponible',
        text: 'Este nombre de usuario ya existe o no tienes permisos para crear cuentas.',
        icon: 'error',
        confirmButtonColor: '#6b5fa4',
      });
      return;
    }

    Toastify({
      text: '¡Empleado creado correctamente!',
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
