# Turnity Web

Este es el frontend del sistema de gestión **Turnity**, construido con [Next.js](https://nextjs.org) (App Router) y React 19.

## Características

- 🚀 **Next.js 15+** con soporte para Server Components.
- 🎨 **Tailwind CSS 4** para un diseño moderno y fluido.
- 🔐 **Sistema de Autenticación** con manejo de sesiones vía cookies.
- 🛠️ **Cliente de API Robusto** listo para conectar con el backend.

## Desarrollo

### Requisitos

- Node.js 20+
- Backend [turnity-api](https://github.com/cristhianm30/turnity-api) (opcional para desarrollo con mocks)

### Configuración

1. Clona el repositorio.
2. Copia el archivo de ejemplo para las variables de entorno:
   ```bash
   cp .env.example .env.local
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

### Scripts

- `npm run dev`: Inicia el servidor de desarrollo en `http://localhost:3000`.
- `npm run build`: Genera el build de producción.
- `npm run lint`: Ejecuta el linter para asegurar la calidad del código.

## Conexión con el Backend

El frontend está configurado para conectarse con **turnity-api**. Puedes cambiar entre el modo "Mock" y "API Real" en `context/auth-context.tsx`.

La URL del backend se configura en el archivo `.env.local`:
```env
TURNITY_API_URL=http://localhost:8080/api
```

## Arquitectura

- `/app`: Rutas y páginas (Next.js App Router).
- `/components`: Componentes de UI reutilizables.
- `/context`: Proveedores de estado global (Auth, etc).
- `/lib`: Utilidades, helpers y cliente de API.
- `/types`: Definiciones de TypeScript.
