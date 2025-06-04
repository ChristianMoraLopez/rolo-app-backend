# Usa una imagen base liviana de Node.js versión 20, basada en Alpine Linux.
# Alpine es una distribución pequeña y segura, ideal para contenedores.
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor en /app.
# Todos los comandos siguientes se ejecutarán desde este directorio.
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json) al directorio de trabajo.
# Esto permite instalar solo las dependencias antes de copiar el resto del código (para aprovechar la caché de Docker).
COPY package.json package-lock.json ./

# Instala las dependencias usando `npm ci`, que es más rápido y confiable en entornos de CI/CD.
# `npm ci` elimina la carpeta `node_modules` y la reinstala exactamente como está en el lockfile.
RUN npm ci

# Copia el resto del código fuente al contenedor.
# Esto incluye archivos de configuración, TypeScript, etc.
COPY . .

# Da permisos de ejecución al compilador TypeScript (tsc), por si es necesario ejecutarlo como script.
# Esto previene errores de permisos al compilar.
RUN chmod +x node_modules/.bin/tsc

# Compila el proyecto (probablemente TypeScript a JavaScript) según lo definido en el script `build` del package.json.
RUN npm run build

# Expone el puerto 8080 al exterior del contenedor.
# Esto no abre el puerto, solo documenta la intención.
EXPOSE 8080

# Comando por defecto para ejecutar cuando el contenedor se inicia.
# En este caso, inicia la aplicación con `npm run start`.
CMD ["npm", "run", "start"]
