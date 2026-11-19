import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { ProyectoService } from '../../core/services/proyecto';
import { TareaService } from '../../core/services/tarea';
import { EmpleadoService } from '../../core/services/empleado';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements AfterViewInit {
  totalProyectos: number = 0;
  totalTareas: number = 0;
  totalEmpleados: number = 0;

  tareasCompletadas: number = 0;
  tareasEnProgreso: number = 0;
  tareasPendientes: number = 0;

  constructor(
    private proyectoService: ProyectoService,
    private tareaService: TareaService,
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef,
  ) {}

  localStatistics(): void{
    const proyectos = this.proyectoService.getProyectos();
    const tareas = this.tareaService.getTareas();
    const empleados = this.empleadoService.getEmpleados();
    
    // total statistics
    this.totalProyectos = proyectos.length;
    this.totalTareas = tareas.length;
    this.totalEmpleados = empleados.length;

    // filter tarea con el estado
    this.tareasCompletadas = tareas.filter(tarea => tarea.estado === 'completada').length;
    this.tareasEnProgreso = tareas.filter(tarea => tarea.estado === 'en-progreso').length;
    this.tareasPendientes = tareas.filter(tarea => tarea.estado === 'pendiente').length;
  }

  ngAfterViewInit(): void {
    this.localStatistics();
    this.createTasksChart();
    this.cdr.detectChanges();
  }

  createTasksChart(): void {
    const canvas = document.getElementById('tasksChart') as HTMLCanvasElement;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Completadas', 'En progreso', 'Pendientes'],
        datasets: [
          {
            label: 'Número de tareas',
            data: [this.tareasCompletadas, this.tareasEnProgreso, this.tareasPendientes],
            backgroundColor: ['#6B5FA4', '#9995E8', '#FDB5A5'],
            borderRadius: 8,
            barThickness: 55,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });
  }
}
