import { Injectable } from '@angular/core';
import { Empleado } from '../../models/empleado.model';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private nextId: number = 1;
  private empleados: Empleado[] = [];

  constructor() {
    const storedEmpleados = localStorage.getItem('empleados');

    if (storedEmpleados) {
      this.empleados = JSON.parse(storedEmpleados);

      this.nextId =
        this.empleados.length > 0 ? Math.max(...this.empleados.map((empleado) => empleado.id)) + 1 : 1;
    }
  }

  private saveEmpleados(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  // get all empleados
  getEmpleados(): Empleado[] {
    return this.empleados;
  }

  // get an empleado by id
  getEmpleadoById(id: number): Empleado | undefined {
    return this.empleados.find((empleado) => empleado.id === id);
  }

  // add a new empleado
  addEmpleado(empleado: Omit<Empleado, 'id'>): void {
    const newEmpleado: Empleado = {
      id: this.nextId++,
      ...empleado,
    };
    this.empleados.push(newEmpleado);
    this.saveEmpleados();
  }

  // update an empleado by id
  updateEmpleado(id: number, updatedEmpleado: Omit<Empleado, 'id'>): void {
    const index = this.empleados.findIndex((empleado) => empleado.id === id);
    if (index !== -1) {
      this.empleados[index] = { ...this.empleados[index], ...updatedEmpleado };
      this.saveEmpleados();
    }
  }

  // delete an empleado by id
  deleteEmpleado(id: number): void {
    this.empleados = this.empleados.filter((empleado) => empleado.id !== id);
    this.saveEmpleados();
  }
}
