# Gestión de Proyectos

Aplicación web desarrollada con Angular 21 para gestionar proyectos, tareas y empleados. Incluye autenticación simulada, control de permisos según el tipo de usuario, asignación de tareas y proyectos, y un dashboard con estadísticas.

## Tecnologías utilizadas

- Angular 21
- TypeScript
- HTML5
- SCSS
- Angular Router
- Chart.js
- SweetAlert2
- Toastify JS
- Lucide Angular
- LocalStorage y SessionStorage

## Funcionalidades

### Autenticación
- Inicio y cierre de sesión.
- Cuenta de administrador predeterminada.
- Creación de cuentas para empleados.
- Sesión almacenada mediante SessionStorage.

### Administrador
- Gestión completa de proyectos.
- Gestión completa de tareas.
- Gestión de empleados.
- Asignación de empleados a proyectos y tareas.
- Acceso a todas las estadísticas.

### Empleado
- Consulta de sus proyectos asignados.
- Consulta de sus tareas asignadas.
- Visualización de los detalles.
- Actualización del estado de sus tareas.

### Dashboard
- Total de proyectos.
- Total de tareas.
- Total de empleados.
- Gráfico con el estado de las tareas.

## Requisitos previos

Antes de ejecutar el proyecto, necesitas tener instalado:

- [Node.js](https://nodejs.org/)
- npm (se instala junto con Node.js)
- Angular CLI 21 (opcional, se puede ejecutar mediante `npx`).

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/BensadikNada/practica-angular-
```

2. Entrar en la carpeta del proyecto:

```bash
cd gestion-proyectos-app
```

3. Instalar las dependencias:

```bash
npm install
```

## Ejecutar la aplicación

Iniciar el servidor de desarrollo:

```bash
npx ng serve -o
```

La aplicación estará disponible en:

```text
http://localhost:4200/
```

Para detener el servidor, pulsa `Ctrl + C` en la terminal.

## Credenciales de acceso

### Administrador

```text
Usuario: admin
Contraseña: admin123
```

El administrador puede crear empleados desde la sección correspondiente. Las cuentas de empleado se generan durante ese proceso.

## Almacenamiento

La aplicación utiliza el almacenamiento del navegador:

- `localStorage`: guarda proyectos, tareas, empleados y usuarios.
- `sessionStorage`: guarda la sesión del usuario conectado.

No es necesario configurar una base de datos ni un servidor backend para ejecutar esta versión.

## Estructura del proyecto

```text
src/
└── app/
    ├── core/
    │   ├── guards/
    │   └── services/
    ├── features/
    │   ├── auth/
    │   ├── dashboard/
    │   ├── proyectos/
    │   ├── tareas/
    │   └── empleados/
    ├── models/
    ├── shared/
    └── app.routes.ts
```

## Notas

- La autenticación está simulada en el frontend.
- Los datos se almacenan localmente en el navegador.
- Para utilizar la aplicación en un entorno de producción sería necesario implementar un backend, una base de datos y un sistema de autenticación seguro.
- Las contraseñas se gestionan únicamente como parte de la simulación de esta prueba técnica; no es un sistema adecuado para producción.

## Autor

Proyecto desarrollado como parte de una prueba técnica para un proceso de prácticas de desarrollo web.
