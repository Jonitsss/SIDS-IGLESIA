Lee primero PROJECT.md para entender el proyecto completo.

## Reglas
- **Antes de commitear, verificar si README.md o PROJECT.md necesitan actualizarse con los cambios realizados. Si no hay cambios relevantes para docs, omitir.**
- Usar siempre TypeScript estricto
- Componentes "use client" cuando usen hooks o interactividad
- Preferir shadcn/ui components sobre HTML nativo
- Los estilos van en globals.css, usar Tailwind classes en componentes
- No agregar comentarios en el código a menos que sea necesario
- Imágenes siempre con `quality={100}` si se requiere máxima calidad
- Usar siempre `next/image` con `fill` + `sizes` para imágenes responsive

## Comandos
- `npm run dev` - Desarrollo
- `npm run build` - Producción (verificar antes de commits)
- `npm run lint` - Linter

## Contexto de la Landing Page
- Fondo oscuro `#0a0a0a` con radial-gradients verdes (`#73A243`, `#2A6A47`, `#DAE953`) en ambos modos
- Day mode con switch (ThemeContext), letra oscura en light mode
- Fuente: Public Sans (Google Fonts)
- Iconos sociales: Font Awesome 4.7 (fa-facebook, fa-youtube-play, fa-instagram)
- Nav social: Facebook, YouTube, Instagram con urls reales + theme toggle
- Secciones: Dra. Magdalena → Obispo → Sección full-width (imagen collage + horarios) → Mapa → Footer
- Sin links "Acceso" visibles — solo `/login` por URL directa
- Imágenes: Dra.jpg, Obispo.jpg, Musicosection.jpg
- Animaciones: framer-motion (fade-in-up al hacer scroll)
- La sección de horarios es full-width (edge-to-edge), el resto tiene max-w-5xl

## Dashboard protegido
- Layout interno con meta robots noindex
- Sidebar con bg-card/90 backdrop-blur-xl