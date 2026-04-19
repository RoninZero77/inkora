# INKORA - Tattoo Studio System

Diseña tu piel... Reserva tu historia.

Este proyecto es una solución profesional full-stack para estudios de tatuajes, construida con un enfoque en escalabilidad, mantenibilidad y una experiencia de usuario premium.

## 🏗️ Arquitectura

### Frontend (Client)
- **Framework**: React 19 con Vite.
- **Styling**: Tailwind CSS para un diseño moderno y responsive.
- **Animaciones**: Framer Motion para micro-interacciones suaves.
- **Validación**: React Hook Form + Zod.
- **Iconos**: Lucide React.

### Backend (Server)
- **Framework**: NestJS (Arquitectura Modular).
- **ORM**: Prisma para interacción con base de datos.
- **Base de Datos**: PostgreSQL (Relacional).
- **Documentación**: Swagger (disponible en `/api`).
- **Validación**: Class-validator para DTOs.

## 🚀 Instalación y Ejecución

### Requisitos previos
- Node.js (v18+)
- Instancia de PostgreSQL

### Servidor (Backend)
1. Navega a `server/`
2. Instala dependencias: `npm install`
3. Configura el `.env` con tu `DATABASE_URL`
4. Ejecuta migraciones: `npx prisma migrate dev` (requiere DB activa)
5. Inicia el servidor: `npm run start:dev`

### Cliente (Frontend)
1. Navega a `client/`
2. Instala dependencias: `npm install`
3. Inicia el desarrollo: `npm run dev`

## 🧩 Decisiones Técnicas Clave

- **NestJS**: Elegido por su estructura robusta que impone principios SOLID y facilita la escalabilidad hacia microservicios.
- **PostgreSQL**: Se prefiere sobre NoSQL para este caso debido a las relaciones críticas entre citas, artistas y categorías, asegurando integridad referencial.
- **Prisma**: Ofrece seguridad de tipos en toda la aplicación (Type-safe queries).
- **Zustand**: Gestor de estado ligero para el frontend que evita el boilerplate excesivo de Redux.
- **Framer Motion**: Implementado para elevar la percepción de marca mediante un diseño que se siente "vivo".

## 🛠️ Próximos Pasos (Escalabilidad)
- Implementar Autenticación (JWT) para el panel de administración.
- Integración de pasarela de pagos (Stripe) para depósitos de reserva.
- Carga de imágenes a la nube (AWS S3 / Cloudinary).
- Sistema de notificaciones vía WhatsApp/Email automatizado.
