# Plan para JLR Print Studios

## Resumen
Crear una web profesional y corporativa para **JLR Print Studios**, negocio de impresión de fotos y documentos, con logotipo personalizado (J azul, L rojo/amarillo, R negro), secciones de servicios, precios, y un flujo de pedidos online.

## Restricción técnica importante: GitHub Pages
GitHub Pages solo admite sitios **estáticos** (HTML/CSS/JS sin servidor). Un flujo real de pedidos online requiere:
- Subida de archivos a un servidor
- Base de datos para guardar pedidos
- Autenticación/estado del pedido

Por tanto, proponemos dos capas:
1. **Frontend estático** (React + TypeScript compilado a JS) que se puede desplegar en GitHub Pages.
2. **Backend de pedidos** con Lovable Cloud (base de datos + almacenamiento de archivos). El frontend se conecta a este backend.

Esto permite que la web "corra" en GitHub Pages visualmente, mientras los pedidos se gestionan mediante Lovable Cloud.

## Estructura propuesta

### 1. Sistema de diseño
- Paleta corporativa: azul oscuro (#0f172a, #1e3a5f), azul primario (#3b82f6), blanco.
- Tipografía moderna y legible.
- Componentes reutilizables: botón primario, tarjetas de servicio, formulario de pedido.

### 2. Páginas
- **Inicio (`/`)**: hero con nombre de marca, servicios destacados, llamadas a la acción.
- **Servicios (`/servicios`)**: impresión de fotos, documentos, posters, encuadernación, etc.
- **Precios (`/precios`)**: tabla/cards de precios.
- **Pedido (`/pedido`)**: formulario para subir archivos y especificar detalles del pedido.
- **Contacto (`/contacto`)**: formulario de contacto + datos del negocio.

### 3. Pedidos online
- Habilitar Lovable Cloud para almacenar pedidos y archivos.
- Formulario de pedido con validación (nombre, email, tipo de impresión, archivo, cantidad).
- Subida de archivos a almacenamiento.
- Confirmación de pedido al usuario.

### 4. Exportación a GitHub Pages
- Configurar build estático (`ssr: false` + exportación de rutas).
- Instrucciones para desplegar la carpeta `dist/` a GitHub Pages.

## Tecnologías
- React + TypeScript (el proyecto actual).
- Tailwind CSS v4 para estilos.
- TanStack Router para navegación.
- Lovable Cloud (Supabase) para backend de pedidos.

## Próximos pasos
1. Confirmar que entiendes la división frontend/backend y que quieres proceder con Lovable Cloud.
2. Implementar el diseño y páginas.
3. Configurar Lovable Cloud y el flujo de pedidos.
4. Configurar exportación estática y documentar despliegue en GitHub Pages.

¿Procedemos con este enfoque?