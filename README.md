# CRM - CLINICA

Este es el repositorio del proyecto CRM - Clínica, el cual fue desarrollado como parte del curso de la Universidad Distrital, bajo la iniciativa "Todos A la U". El objetivo principal de este proyecto es consumir el API Clínica y proporcionar una interfaz de usuario intuitiva para administrar y gestionar diferentes aspectos de una clínica médica.

## Características principales

Consumo del API Clínica: Este proyecto se enfoca en consumir los diferentes endpoints del API Clínica, que se encuentra disponible en https://api-clinica-obru.onrender.com. Proporciona una integración completa con los servicios proporcionados por el API para realizar tareas como la gestión de pacientes, citas, médicos y más.

Desarrollado con TypeScript y React: El proyecto se ha desarrollado utilizando TypeScript como lenguaje de programación principal, lo que brinda beneficios como el tipado estático y una mayor escalabilidad del código. La interfaz de usuario se ha construido utilizando React, un popular framework de JavaScript para construir interfaces de usuario interactivas y reutilizables.

## Tecnologías empleadas

El proyecto ha sido desarrollado utilizando las siguientes tecnologías:

- Lenguaje: TypeScript

### Bibliotecas utilizadas

A lo largo del proyecto, se han utilizado varias bibliotecas para mejorar la funcionalidad y la eficiencia del código. A continuación, se detallan las bibliotecas utilizadas y una breve descripción de cada una:

- **@reduxjs/toolkit:** Esta biblioteca proporciona una forma eficiente y simplificada de gestionar el estado de la aplicación utilizando Redux. Permite la creación de acciones, reducers y el almacenamiento centralizado de datos de una manera más intuitiva y concisa.

- **axios:** Axios es una biblioteca popular utilizada para realizar solicitudes HTTP desde el navegador o desde un servidor Node.js. Se utiliza en este proyecto para realizar peticiones al API Clínica y obtener datos de manera eficiente.

- **date-fns:** Date-fns es una biblioteca ligera de manipulación y formateo de fechas en JavaScript. Proporciona numerosas funciones para trabajar con fechas, como cálculos, formateo y análisis de fechas. Se utiliza en este proyecto para realizar operaciones relacionadas con las fechas, como seleccionar y mostrar fechas en los componentes de la interfaz de usuario.

- **jwt-decode:** Esta biblioteca se utiliza para decodificar tokens JSON Web Token (JWT). Permite extraer información del token, como el usuario autenticado, y utilizarla en el cliente.

- **react:** React es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas. Proporciona un enfoque basado en componentes para el desarrollo de aplicaciones web. El proyecto utiliza React como base para la construcción de la interfaz de usuario del CRM - Clínica.

- **react-datepicker:** React Datepicker es un componente de selección de fechas flexible y fácil de usar para React. Permite a los usuarios seleccionar fechas de forma intuitiva en la interfaz de usuario.

- **react-dom:** React DOM es una biblioteca que proporciona métodos específicos para interactuar con el DOM (Document Object Model). Se utiliza en este proyecto para renderizar los componentes de React en el navegador.

- **react-hook-form:** React Hook Form es una biblioteca para formularios en React que simplifica el manejo de formularios complejos. Proporciona un enfoque basado en hooks para el manejo de la validación y el estado de los formularios.

- **react-redux:** React Redux es una biblioteca que proporciona una integración entre React y Redux. Se utiliza para conectar los componentes de React al almacenamiento centralizado de Redux y facilitar la gestión del estado de la aplicación.

- **react-router-dom:** React Router DOM es una biblioteca utilizada para el enrutamiento en aplicaciones de React. Permite la navegación entre diferentes componentes y páginas de manera eficiente.

- **sweetalert2:** SweetAlert2 es una biblioteca de notificaciones y alertas personalizables. Proporciona una forma elegante y fácil de mostrar mensajes de éxito, error, advertencia, etc., en la interfaz de usuario del CRM - Clínica.

- **tailwindcss:** Tailwind CSS es un framework de CSS de utilidad que permite construir interfaces de usuario de manera rápida y eficiente. Proporciona una amplia gama de clases predefinidas que se pueden aplicar directamente a los elementos HTML para estilizarlos. Se utiliza en este proyecto para la estilización y el diseño de la interfaz de usuario del CRM - Clínica, lo que facilita la creación de una apariencia coherente y atractiva.

## Desarrollador

- [David Puerto Guerrero](https://github.com/Dsp5502)

## Despliegue

[CRM-Clinica]()

## Instalación

### Configuración del entorno de desarrollo

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno de desarrollo local:

### Pasos:

1. **Clonar el repositorio:** Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio desde el servicio de alojamiento:

   ```bash
   git clone https://github.com/Dsp5502/APIClinica
   ```

2. **Instalar dependencias**: Una vez dentro del directorio del proyecto, instala las dependencias necesarias ejecutando el siguiente comando:

```bash
  npm install
```

3. **Ejecutar la aplicación**: Una vez que todas las dependencias estén instaladas, puedes ejecutar la aplicación con el siguiente comando:

```bash
 npm run dev
```

5. **Acceder a la aplicación:** Abre tu navegador web y visita la dirección http://http://localhost:5173. Si todo ha sido configurado correctamente, deberías poder ver la aplicación en funcionamiento.
