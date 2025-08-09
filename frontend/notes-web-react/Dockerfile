# Usa una imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia del resto del código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Expone el puerto
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]


