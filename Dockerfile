FROM node:14-slim

WORKDIR /app

COPY package*.json ./
COPY .env* ./
COPY .npmrc* ./
COPY /etc/letsencrypt/live/wss-scenes-test.c7pixel.com/fullchain.pem ./fullchain.pem
COPY /etc/letsencrypt/live/wss-scenes-test.c7pixel.com/privkey.pem ./privkey.pem

RUN npm install

COPY . .

EXPOSE 3003

CMD ["node", "index.js"]
