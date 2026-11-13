# Dalia · Level 11 Unlocked

Invitación interactiva original, móvil primero. React + TypeScript strict, Vite, Tailwind CSS 4, Motion y Lucide. Sin backend ni datos almacenados. Ilustración vectorial propia, sin imágenes remotas ni recursos oficiales de Roblox.

## Requisitos e instalación

Node.js 22 o superior y npm. Desde esta carpeta:

```sh
npm ci
npm run dev
```

Abre la URL que imprime Vite. Para verificar producción:

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

`dist/` contiene el sitio estático. El archivo package-lock.json fija las dependencias.

## Datos de la fiesta

Edita `src/config/invitation.ts`. Los campos `null` son pendientes reales; no se muestran eventos ficticios. Configura:

- `name`, `age` y los textos en `messages`.
- `startsAt` y `endsAt`: fecha ISO con offset de Ciudad de México, por ejemplo `2027-01-23T16:00:00-06:00` (solo ejemplo). El final debe ser posterior al inicio. Las fechas se presentan en `America/Mexico_City`; los calendarios se exportan con instantes UTC equivalentes.
- `venue` y `address`: lugar y dirección completa.
- `mapsUrl`: enlace HTTPS de Google Maps; se admiten maps.google.com, google.com/maps y maps.app.goo.gl.
- `whatsapp`: código de país y número, solo dígitos, sin espacios ni signo +. Utiliza el formato internacional vigente de la cuenta destinataria.
- `publicUrl`: URL HTTPS pública completa, incluyendo el subdirectorio si aplica.

Sin fecha se muestran guiones en el contador. Al llegar la fecha aparece el mensaje de celebración. Sin horario completo y válido, las acciones de calendario quedan deshabilitadas. Sin Maps o WhatsApp configurados, las respectivas acciones también permanecen deshabilitadas.

El formulario abre un mensaje en WhatsApp. **La persona debe presionar Enviar dentro de WhatsApp**; la web no guarda confirmaciones ni comprueba su entrega. No se envían datos a servidores de esta aplicación.

## Música opcional

Coloca un archivo autorizado en `public/music.mp3` y configura `music: 'music.mp3'`. La música comienza al jalar o tocar el listón para abrir el regalo y continúa durante la invitación. El control de música aparece a partir de ese momento. Ese toque permite solicitar la reproducción en navegadores móviles. El botón flotante permite pausarla o reanudarla; si el navegador bloquea el inicio, puedes activarla desde ese botón. Si el archivo falta o el navegador bloquea la reproducción, se informa sin impedir el resto de la experiencia. Si el sitio está en una subcarpeta, las rutas de audio respetan el base de Vite.

## Imágenes y colores

`src/components/World.tsx` contiene el avatar y la isla SVG original: es vectorial, local y no requiere descargas ni fuentes externas. Cambia formas y colores allí. Los estilos responsive y variables están en `src/styles/index.css`, que importa Tailwind. Puedes usar utilidades Tailwind en los componentes.

`public/og-cover.png` es la portada local original de 1200 × 630. Actualiza también título, descripción y etiquetas Open Graph en `index.html`. **Antes de compartir**, cambia `og:image` a la URL absoluta final de la portada y agrega `og:url` con la URL pública. Los rastreadores de WhatsApp no ejecutan React, por lo que esos metadatos se editan en HTML, además de la configuración de la app. HTTPS y una portada accesible públicamente son necesarios para que WhatsApp pueda generar la previsualización; su caché puede retrasar cambios.

## GitHub Pages

1. Crea un repositorio, por ejemplo `dalia-birthday`, y sube estos archivos con `package-lock.json` a la rama `main`.
2. En Settings → Pages → Build and deployment selecciona **GitHub Actions**.
3. El workflow `.github/workflows/deploy.yml` ejecuta `npm ci`, TypeScript, lint y build; publica `dist/`.
4. La acción oficial de Pages obtiene el `base_path` del repositorio y lo pasa como `VITE_BASE_PATH` al build. Funciona bajo `https://USUARIO.github.io/dalia-birthday/`.
5. Configura `publicUrl` y los metadatos absolutos de `index.html` con tu URL real.

El base local predeterminado es `./`. Para otra plataforma puedes pasar `VITE_BASE_PATH=/subcarpeta/ npm run build`. No hay rutas de aplicación que necesiten rewrites: la navegación usa anclas dentro de la misma página.

Para un dominio personalizado, configúralo en Settings → Pages, activa HTTPS y agrega el CNAME que indique GitHub en `public/CNAME`. La acción de Pages ajusta su base al dominio. Actualiza `publicUrl`, `og:url` y `og:image`.

Para actualizar: edita, ejecuta las tres comprobaciones, haz commit y push a `main`; Actions desplegará la nueva versión. Este proyecto prepara la automatización; no crea repositorios ni publica por sí solo desde tu computadora.

## Prueba desde un celular

Con teléfono y computadora en la misma red, ejecuta `npm run dev` y abre la dirección Network de Vite (por ejemplo `http://192.168.x.x:5173`). Permite el acceso de red local si el sistema lo solicita. Comprueba Safari de iPhone y Chrome de Android con ancho de 390 px, teclado abierto y orientación horizontal. Después repite las pruebas con la URL HTTPS de Pages.

Recorre bienvenida → detalles → misiones → formulario. Con datos reales, verifica Maps, el destinatario y texto de WhatsApp, Google Calendar, el archivo ICS y la URL compartida. Comprueba fecha y hora en Ciudad de México. Toca cinco veces el número 11 para el easter egg. Prueba sin música y con movimiento reducido activado. Puedes navegar con Tab y Enter; los inputs tienen etiquetas y hay un enlace para saltar al contenido.

## Estructura

- `src/config/`: datos editables.
- `src/components/`: ilustración y confeti.
- `src/sections/`: formulario de asistencia.
- `src/hooks/`: contador en tiempo real.
- `src/utils/`: URLs y exportación de calendario.
- `src/styles/`: composición, responsive y movimiento reducido.
- `public/`: portada y audio opcional.

No se requiere una cuenta de pago ni un servicio externo de almacenamiento. Los enlaces externos solo se abren por una acción del invitado.

## Verificaciones incluidas

`npm test` comprueba fechas pendientes/inválidas, el orden de inicio y fin, la conversión a UTC del horario de Ciudad de México, el contenido/escape del ICS y las rutas bajo `/dalia-birthday/`. El generador opcional `python3 scripts/create-cover.py` reproduce la portada sin bibliotecas externas. El override acotado de minimatch actualiza la dependencia de las herramientas de lint a su versión corregida.

Se verificaron TypeScript, lint, las pruebas de calendario, el build y la existencia de sus recursos locales. La revisión visual en navegadores reales, la entrega de WhatsApp y la publicación en Pages requieren ejecutarse en sus respectivos entornos; no se presentan como verificadas por este proyecto.

## Miniaventura de Rocko

Después de “¡Entrar al juego!” aparece un rompecabezas de nueve bloques con una ilustración original de Rocko, el french poodle de Dalia. Toca una pieza y después otra para intercambiarlas; la miniatura indica la imagen final. No hay límite de tiempo. El contador muestra cuántas piezas están en su lugar y se puede reiniciar. También funciona con Tab y Enter/Espacio.

Al resolverlo aparece una caja de regalo. Arrastra el extremo del listón hacia abajo para abrirla, o actívalo con un toque/teclado. Tras la animación se muestra la invitación. Se respeta la preferencia de movimiento reducido. El progreso solo existe durante la visita y no se almacena. La ilustración y el flujo están en `src/components/RockoPuzzle.tsx`; la lógica de intercambio, en `src/utils/puzzle.ts`. `npm test` incluye una comprobación de que todas las piezas están presentes y que se puede completar el tablero.
