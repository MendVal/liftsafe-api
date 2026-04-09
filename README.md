# API LiftSafe - Inspecciones de Ascensores

API REST para la gestión de inspecciones de ascensores.  
Permite registrar ascensores, solicitudes de inspección e inspecciones.  
Proyecto académico basado en Node.js, Express y MySQL.

---

## 🚀 Endpoints disponibles

### Prueba de conexión a la base de datos
- **GET** `/test-db`

### Ascensores
- **POST** `/api/ascensores` – Crear ascensor
- **GET** `/api/ascensores` – Listar todos los ascensores
- **GET** `/api/ascensores/:id` – Obtener ascensor por ID

### Solicitudes
- **POST** `/api/solicitudes` – Crear solicitud
- **GET** `/api/solicitudes` – Listar todas las solicitudes
- **GET** `/api/solicitudes/:id` – Obtener solicitud por ID

### Inspecciones
- **POST** `/api/inspecciones` – Crear inspección
- **GET** `/api/inspecciones` – Listar todas las inspecciones
- **GET** `/api/inspecciones/:id` – Obtener inspección por ID

---

## 📋 Requisitos previos

- Node.js (v14 o superior)
- MySQL (XAMPP, WAMP o instalación independiente)

---

## 🔧 Instalación y ejecución local

Sigue estos pasos para ejecutar la API en tu computadora:

1. **Clonar o descargar el repositorio**
   ```bash
   git clone https://github.com/MendVal/liftsafe-api.git
   cd liftsafe-api

---
## Crear la base de datos

 1. Abre phpMyAdmin o la línea de comandos de MySQL.

 2. Crea una base de datos llamada liftsafe_db (collation utf8mb4_unicode_ci).

 3. Importa el archivo liftsafe_db.sql (incluido en el repositorio). Este script crea todas las tablas y carga datos de ejemplo.

 4. Configurar conexión (opcional)

El archivo src/config/db.js usa por defecto:
```bash
js
host: 'localhost',
user: 'root',
password: '',
database: 'liftsafe_db'
Si tu MySQL tiene otra configuración, edita este archivo.
```
---
## Instalar dependencias

```bash
npm install
Iniciar el servidor

npm run dev
Verás:

text
 Servidor LiftSafe en http://localhost:3000
 POST /api/ascensores
 POST /api/solicitudes
 POST /api/inspecciones
```
---
## Ejemplos de peticiones
Probar conexión
http
GET http://localhost:3000/test-db

Crear ascensor
http
POST http://localhost:3000/api/ascensores
Content-Type: application/json

```bash
{
    "id_cliente": 11,
    "codigo_interno": "ASC-PRUEBA-01",
    "marca": "Schindler",
    "modelo": "5500",
    "numero_serie": "SERIE-001",
    "tipo_ascensor": "Pasajeros",
    "capacidad_kg": 750,
    "capacidad_personas": 10,
    "numero_pisos": 12,
    "velocidad_ms": 1.75,
    "ubicacion_exacta": "Torre A",
    "direccion_completa": "Calle 123",
    "ciudad": "Bogotá",
    "fecha_instalacion": "2024-01-01"
}
```

Crear solicitud
http
POST http://localhost:3000/api/solicitudes
Content-Type: application/json
```bash
{
    "id_cliente": 11,
    "id_ascensor": 1,
    "tipo_servicio": "Inspección Periódica",
    "prioridad": "Alta",
    "fecha_solicitud": "2026-04-09",
    "fecha_deseada": "2026-04-30",
    "observaciones": "Revisión anual"
}
```

Crear inspección
http
POST http://localhost:3000/api/inspecciones
Content-Type: application/json
```bash
{
    "id_programacion": 24,
    "id_ascensor": 25,
    "id_inspector": 4,
    "id_solicitud": 22,
    "fecha_inicio": "2026-04-09 08:00:00"
}
```
Listar ascensores
http
GET http://localhost:3000/api/ascensores

---
## Estructura del proyecto
```bash
text
├── index.js
├── package.json
├── liftsafe_db.sql
├── README.md
└── src/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── ascensor.controller.js
    │   ├── solicitud.controller.js
    │   └── inspeccion.controller.js
    ├── routes/
    │   ├── ascensor.routes.js
    │   ├── solicitud.routes.js
    │   ├── inspeccion.routes.js
    │   └── index.js
    └── index.js (montaje de rutas)

```
## Tecnologías utilizadas
    Node.js

    Express

    MySQL2

    CORS

    Nodemon (desarrollo)