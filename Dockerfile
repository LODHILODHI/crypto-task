# Base image
FROM node:18-alpine

# Working directory set karo
WORKDIR /usr/src/app

# Dependencies copy karo
COPY package*.json ./

# Install dependencies
RUN npm install


# Code copy karo container ke andar
COPY . .
RUN npm run build
# App ka port expose karo
EXPOSE 3000

# Start command for the app
CMD ["npm", "run", "start:prod"]

