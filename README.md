# API MongoDB + Express

Proyecto de API REST con Express y MongoDB usando Mongoose. **Proyecto de estudio**.

## Requisitos previos

- Node.js (v14 o superior)
- npm o yarn
- Conexión a internet (si usas MongoDB Atlas)

## Instalación

1. **Descargar o clonar el proyecto**

```bash
cd api-mongo
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

El archivo `.env` ya viene configurado con los datos de MongoDB Atlas de ejemplo:

```env
MONGODB_URI=mongodb+srv://davidjulm_db_user:A8KUXjSrPoUuXrdy@jovenes-creativos-mongo.obsgzto.mongodb.net/example-users
PORT=3000
NODE_ENV=development
```

**⚠️ Nota:** Este proyecto utiliza una base de datos de ejemplo con credenciales públicas. Es solo para propósitos educativos. En producción, **nunca** hardcodees credenciales.

## Uso

### Desarrollo (con nodemon)

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Producción

```bash
npm start
```

## Estructura del proyecto

```
api-mongo/
├── src/
│   ├── server.js           # Servidor principal con todas las rutas
│   └── models/
│       └── User.js         # Modelo de Usuario (Mongoose Schema)
├── .env                    # Variables de entorno (configurado)
├── .env.example            # Ejemplo de variables de entorno
├── .gitignore              # Archivos a ignorar en Git
├── package.json            # Dependencias del proyecto
├── package-lock.json       # Lock de dependencias
└── README.md              # Este archivo
```

## Dependencias principales

- **express**: Framework web para crear la API
- **mongoose**: ODM para MongoDB
- **dotenv**: Carga variables de entorno desde `.env`
- **cors**: Middleware para CORS
- **body-parser**: Middleware para parsear JSON
- **nodemon** (dev): Reinicia automáticamente el servidor durante desarrollo

## API Endpoints

### Health Check
- `GET /health` - Verificar si el servidor está activo y estado de conexión con MongoDB

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `POST /api/usuarios` - Crear un nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar un usuario
- `DELETE /api/usuarios/:id` - Eliminar un usuario

## Modelo de Usuario

El modelo `Usuario` tiene los siguientes campos:

```javascript
{
  nombre: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  rol: {
    type: String,
    enum: ['cliente', 'repostero', 'admin'],
    default: 'cliente'
  },
  puntos: {
    type: Number,
    min: 0,
    default: 0
  },
  activo: {
    type: Boolean,
    default: true
  },
  timestamps: true  // createdAt, updatedAt
}
```

## Ejemplos de uso

### Obtener todos los usuarios
```bash
curl http://localhost:3000/api/usuarios
```

### Crear un nuevo usuario
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan García",
    "email": "juan@example.com",
    "rol": "cliente",
    "puntos": 100
  }'
```

### Obtener un usuario por ID
```bash
curl http://localhost:3000/api/usuarios/[ID]
```

### Actualizar un usuario
```bash
curl -X PUT http://localhost:3000/api/usuarios/[ID] \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nuevo Nombre",
    "puntos": 150
  }'
```

### Eliminar un usuario
```bash
curl -X DELETE http://localhost:3000/api/usuarios/[ID]
```

### Verificar estado del servidor
```bash
curl http://localhost:3000/health
```

Respuesta:
```json
{
  "status": "OK",
  "message": "Servidor activo",
  "timestamp": "2026-10-10T...",
  "mongodbConnected": true
}
```

## Conexión a MongoDB

Este proyecto está configurado para conectarse a **MongoDB Atlas** (nube).

### Credenciales de ejemplo (solo para educación)

```
Usuario: davidjulm_db_user
Contraseña: A8KUXjSrPoUuXrdy
Cluster: jovenes-creativos-mongo.obsgzto.mongodb.net
Base de datos: example-users
```

La conexión se realiza automáticamente al iniciar el servidor. La URI está en `.env`:

```env
MONGODB_URI=mongodb+srv://davidjulm_db_user:A8KUXjSrPoUuXrdy@jovenes-creativos-mongo.obsgzto.mongodb.net/example-users
```

**⚠️ Advertencia de seguridad:** En un proyecto real en producción:
- **NUNCA** commits credenciales al repositorio
- Usa variables de entorno privadas
- Cambia las contraseñas regularmente
- Usa usuarios con permisos limitados

## Recursos

- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
