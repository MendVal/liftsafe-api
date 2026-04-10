# API LiftSafe - Inspecciones de Ascensores

API REST para la gestión de inspecciones de ascensores.  
Permite registrar ascensores, solicitudes de inspección e inspecciones.  
Proyecto académico basado en Node.js, Express y MySQL.

---

## 🌐 API desplegada en Railway (producción)

La API está disponible en la nube en la siguiente URL:

**`https://liftsafe-api-production.up.railway.app`**

Puedes probar los endpoints `GET` directamente desde el navegador.  
Para probar los `POST` necesitarás una herramienta como **Thunder Client**, **Postman** o **cURL**.

### Ejemplo de `POST` con cURL (desde tu terminal):

```bash
curl -X POST https://liftsafe-api-production.up.railway.app/api/ascensores \
  -H "Content-Type: application/json" \
  -d '{"id_cliente":11,"codigo_interno":"CURL-01","marca":"Otis","modelo":"Gen2","numero_serie":"CURL001","tipo_ascensor":"Pasajeros","capacidad_kg":630,"capacidad_personas":8,"numero_pisos":10,"ubicacion_exacta":"Prueba","direccion_completa":"Calle 123","ciudad":"Bogotá","fecha_instalacion":"2024-01-01"}'
```

## 🚀 Endpoints disponibles
**General**
GET /test-db – Prueba de conexión a la base de datos

**Ascensores**

POST /api/ascensores – Crear un nuevo ascensor

GET /api/ascensores – Listar todos los ascensores

GET /api/ascensores/:id – Obtener un ascensor por su ID

**Solicitudes**

POST /api/solicitudes – Crear una nueva solicitud

GET /api/solicitudes – Listar todas las solicitudes

GET /api/solicitudes/:id – Obtener una solicitud por ID

**Inspecciones**

POST /api/inspecciones – Crear una nueva inspección

GET /api/inspecciones – Listar todas las inspecciones

GET /api/inspecciones/:id – Obtener una inspección por ID


## 📋 Requisitos previos (para ejecución local)
Node.js (v14 o superior)

MySQL (XAMPP, WAMP o instalación independiente)

## 🔧 Instalación y ejecución local
Sigue estos pasos para ejecutar la API en tu computadora:

Clonar o descargar el repositorio

```bash
git clone https://github.com/MendVal/liftsafe-api.git
cd liftsafe-api
```
Crear la base de datos

- Abre phpMyAdmin o la línea de comandos de MySQL.

- Crea una base de datos llamada liftsafe_db (collation utf8mb4_unicode_ci).

- Importa el archivo liftsafe_db.sql (incluido en el repositorio). Este script crea todas las tablas y carga datos de ejemplo.

**Configurar conexión (opcional)**

El archivo src/config/db.js usa por defecto:
```bash
javascript
host: 'localhost',
user: 'root',
password: '',
database: 'liftsafe_db'
Si tu MySQL tiene otra configuración, edita este archivo.
```

**Instalar dependencias**

```bash
npm install
Iniciar el servidor
```
```bash
npm run dev
Verás en la terminal:
```

Veras en la terminal: 
```bash
Servidor LiftSafe en http://localhost:3000
 POST /api/ascensores
 POST /api/solicitudes
 POST /api/inspecciones
```
## Ejemplos de peticiones (local o en la nube)
Probar conexión


**GET** http://localhost:3000/test-db
(Para la nube, usa https://liftsafe-api-production.up.railway.app/test-db)

**Crear ascensor (POST)**
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

**Crear solicitud (POST)**

**POST** http://localhost:3000/api/solicitudes
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
**Crear inspección (POST)**
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
**Listar ascensores (GET)**

GET http://localhost:3000/api/ascensores


## 📁 Estructura del proyecto
```bash
├── index.js
├── package.json
├── liftsafe_db.sql
├── README.md
└── src/
    ├── config/
    │   ├── db.js
    │   └── env.js               
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
## 🛠️ Tecnologías utilizadas

- Node.js

- Express

- MySQL2

- CORS

- Nodemon (desarrollo)