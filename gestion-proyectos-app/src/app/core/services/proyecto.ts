import { Injectable } from '@angular/core';
import { Proyecto } from '../../models/proyecto.model';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private nextId: number = 1;
  private proyectos: Proyecto[] = [];

  constructor() {
    const storedProyectos = localStorage.getItem('proyectos');

    if (storedProyectos) {
      this.proyectos = JSON.parse(storedProyectos);

      this.nextId =
        this.proyectos.length > 0
          ? Math.max(...this.proyectos.map((proyecto) => proyecto.id)) + 1
          : 1;
    }
  }

  // Save projects in localStorage
  private saveProyectos(): void {
    localStorage.setItem('proyectos', JSON.stringify(this.proyectos));
  }

  // Get all projects
  getProyectos(): Proyecto[] {
    return this.proyectos;
  }

  // Get a project by id
  getProyectoById(id: number): Proyecto | undefined {
    return this.proyectos.find((proyecto) => proyecto.id === id);
  }

  // Add a new project
  addProyecto(proyecto: Omit<Proyecto, 'id'>): void {
    const newProyecto: Proyecto = {
      id: this.nextId++,
      ...proyecto,
    };

    this.proyectos.push(newProyecto);
    this.saveProyectos();
  }

  // Update a project by id
  updateProyecto(id: number, updatedProyecto: Omit<Proyecto, 'id'>): void {
    const index = this.proyectos.findIndex((proyecto) => proyecto.id === id);

    if (index !== -1) {
      this.proyectos[index] = {
        ...this.proyectos[index],
        ...updatedProyecto,
      };

      this.saveProyectos();
    }
  }

  // Delete a project by id
  deleteProyecto(id: number): void {
    this.proyectos = this.proyectos.filter((proyecto) => proyecto.id !== id);

    this.saveProyectos();
  }
}
