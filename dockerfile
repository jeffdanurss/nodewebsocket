# Utiliza la imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY package*.json ./

# Instala las dependencias de tu aplicación
RUN npm install

# Copia el resto de los archivos de tu proyecto al contenedor
COPY . .

# Expón el puerto que usa tu aplicación (en este caso, 3001)
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
