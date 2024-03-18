
FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

COPY . .

# Instala las dependencias de desarrollo
RUN npm install


EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
