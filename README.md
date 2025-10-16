# ✈️ Airplane Air - Aplicación de Reserva de Vuelos

## Descripción General
Aplicación web para reservar vuelos construida con React y Vite. Implementa un sistema de búsqueda inteligente con validación de aeropuertos reales y selección de vuelos disponibles.

## Componentes

### App.jsx
Componente principal que actúa como contenedor de toda la aplicación. Gestiona el flujo completo de reserva mediante tres estados: búsqueda (`search`), selección de vuelo (`select`) y confirmación (`confirmed`). Controla la navegación entre componentes y mantiene el estado global de los datos de búsqueda y reserva. Renderiza condicionalmente cada componente según el paso actual del proceso.

### BookingForm.jsx
Formulario inteligente de búsqueda de vuelos con funcionalidad de autocompletado en tiempo real. Carga la lista de aeropuertos desde la base de datos JSON y filtra las sugerencias mientras el usuario escribe en los campos "Origen" y "Destino". Valida que ambos aeropuertos seleccionados existan en la base de datos y que no sean iguales. Incluye campos para fecha de salida, fecha de retorno opcional, número de pasajeros (1-9) y clase de vuelo. Muestra mensajes de error si la validación falla.

### FlightSelection.jsx
Componente que consulta y muestra todos los vuelos disponibles para la ruta seleccionada. Obtiene los datos de vuelos desde la base de datos y filtra aquellos que coincidan con los códigos de aeropuerto de origen y destino. Presenta cada vuelo en una tarjeta interactiva con información detallada: número de vuelo, precio, horarios de salida y llegada, duración del trayecto, aerolínea y cantidad de pasajeros. Permite seleccionar un vuelo haciendo clic en la tarjeta y resalta visualmente el vuelo seleccionado. Incluye botones para volver al formulario de búsqueda o confirmar la selección.

### BookingConfirmation.jsx
Pantalla de confirmación final que muestra un resumen completo de la reserva realizada. Presenta todos los detalles del vuelo seleccionado incluyendo: número de vuelo, aeropuertos de origen y destino, fecha y hora de salida, hora de llegada, duración del vuelo, fecha de retorno (si aplica), número de pasajeros, clase seleccionada y precio total calculado (precio por pasajero multiplicado por cantidad de pasajeros). Incluye un botón para realizar una nueva búsqueda que reinicia todo el proceso.

## Base de Datos

### flightDatabase.json
Archivo JSON ubicado en la carpeta `public/` que simula una base de datos real. Contiene dos colecciones principales:

- **Airports**: 20 aeropuertos internacionales con información completa (código IATA, nombre oficial, ciudad y país). Incluye aeropuertos como JFK, LAX, LHR, CDG, NRT, DXB, SIN, entre otros.

- **Flights**: 26 rutas de vuelo bidireccionales entre diferentes ciudades. Cada vuelo incluye ID único, aeropuertos de origen y destino, horarios de salida y llegada, duración, aerolínea y precio en dólares.

## Estilos

Todos los archivos CSS están organizados en la carpeta `src/style/`:
- `BookingForm.css` - Estilos del formulario y autocompletado
- `FlightSelection.css` - Estilos de las tarjetas de vuelos
- `BookingConfirmation.css` - Estilos de la página de confirmación
- `App.css` - Estilos globales del contenedor principal
