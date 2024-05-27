FROM node:14-slim

WORKDIR /app

COPY package*.json ./
COPY .env* ./
COPY .npmrc* ./
COPY fullchain.pem ./
COPY privkey.pem ./

RUN chmod 644 fullchain.pem privkey.pem

RUN npm install

COPY . .

EXPOSE 3003 8080

CMD ["node", "index.js"]
