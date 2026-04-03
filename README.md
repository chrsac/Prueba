# Plataforma Node.js + SQLite

Sitio web con arquitectura Node.js modular para autenticación y administración de usuarios con roles:

- **admin**: puede iniciar sesión y crear usuarios.
- **operador**: puede iniciar sesión y ver el dashboard.

## Stack

- Node.js + Express
- EJS (vistas)
- SQLite (`better-sqlite3`)
- Sesiones con `express-session`

## Ejecutar localmente

```bash
npm install
npm run start
```

Abrir: `http://localhost:3000`

### Credenciales iniciales

- Usuario: `admin`
- Contraseña: `admin123`

## Estructura

- `src/server.js`: arranque de app y middleware global.
- `src/routes`: rutas de login/dashboard/usuarios.
- `src/services/db.js`: creación y acceso a base SQLite.
- `src/config/menu.js`: menú lateral editable para agregar opciones futuras.
- `src/views`: plantillas EJS.
- `src/public/css/styles.css`: diseño moderno, claro y minimalista.
