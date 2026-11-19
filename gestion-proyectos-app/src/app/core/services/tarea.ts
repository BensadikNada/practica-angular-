import { Injectable } from '@angular/core';
import { Tarea } from '../../models/tarea.model';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private nextId: number = 1;
  private tareas: Tarea[] = [];

  constructor() {
    const storedTareas = localStorage.getItem('tareas');

    if (storedTareas) {
      this.tareas = JSON.parse(storedTareas);

      this.nextId =
        this.tareas.length > 0 ? Math.max(...this.tareas.map((tarea) => tarea.id)) + 1 : 1;
    }
  }

  private saveTareas(): void {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  // get all tareas
  getTareas(): Tarea[] {
    return this.tareas;
  }

  // get a tarea by id
  getTareaById(id: number): Tarea | undefined {
    return this.tareas.find((tarea) => tarea.id === id);
  }

  // add a new tarea
  addTarea(tarea: Omit<Tarea, 'id'>): void {
    const newTarea: Tarea = {
      id: this.nextId++,
      ...tarea,
    };
    this.tareas.push(newTarea);
    this.saveTareas();
  }

  // update a tarea by id
  updateTarea(id: number, updatedTarea: Omit<Tarea, 'id'>): void {
    const index = this.tareas.findIndex((tarea) => tarea.id === id);
    if (index !== -1) {
      this.tareas[index] = { ...this.tareas[index], ...updatedTarea };
      this.saveTareas();
    }
  }

  // delete a tarea by id
  deleteTarea(id: number): void {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    this.saveTareas();
  }
}
