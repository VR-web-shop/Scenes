FROM node:18-slim

WORKDIR /app

COPY package*.json ./
COPY .env* ./
COPY .npmrc* ./
COPY privkey.key ./
COPY cert.crt ./

RUN npm install

COPY . .

EXPOSE 3003 8080

CMD ["node", "index.js"]
