import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: '',
    loadComponent: () => import('./shared/layout/layout').then((m) => m.Layout),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'proyectos',
        loadComponent: () => import('./features/proyectos/proyectos').then((m) => m.Proyectos),
      },
      {
        path: 'proyectos/nuevo',
        loadComponent: () => import('./features/proyectos/crear-proyecto/crear-proyecto').then(m => m.CrearProyecto),
        canActivate: [adminGuard],
      },
      {
        path: 'proyectos/:id',
        loadComponent: () => import('./features/proyectos/detalle-proyecto/detalle-proyecto').then(m => m.DetalleProyecto),
      },
      {
        path: 'proyectos/editar/:id',
        loadComponent: () => import('./features/proyectos/editar-proyecto/editar-proyecto').then(m => m.EditarProyecto),
        canActivate: [adminGuard],
      },
      {
        path: 'tareas',
        loadComponent: () => import('./features/tareas/tareas').then((m) => m.Tareas),
      },
      {
        path: 'tareas/nueva',
        loadComponent: () => import('./features/tareas/crear-tarea/crear-tarea').then(m => m.CrearTarea),
        canActivate: [adminGuard],
      },
      {
        path: 'tareas/:id',
        loadComponent: () => import('./features/tareas/detalle-tarea/detalle-tarea').then(m => m.DetalleTarea),
      },
      {
        path: 'tareas/editar/:id',
        loadComponent: () => import('./features/tareas/editar-tarea/editar-tarea').then(m => m.EditarTarea),
        canActivate: [adminGuard],
      },
      {
        path: 'empleados',
        loadComponent: () => import('./features/empleados/empleados').then((m) => m.Empleados),
        canActivate: [adminGuard],
      },
      {
        path: 'empleados/nuevo',
        loadComponent: () => import('./features/empleados/crear-empleado/crear-empleado').then(m => m.CrearEmpleado),
        canActivate: [adminGuard],
      },
      {
        path: 'empleados/:id',
        loadComponent: () => import('./features/empleados/detalle-empleado/detalle-empleado').then(m => m.DetalleEmpleado),
        canActivate: [adminGuard],
      },
      {
        path: 'empleados/editar/:id',
        loadComponent: () => import('./features/empleados/editar-empleado/editar-empleado').then(m => m.EditarEmpleado),
        canActivate: [adminGuard],
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
