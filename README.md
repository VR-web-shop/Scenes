# Scenes
Scenes Microservice

## Install
1. Install Dependencies
```
$ npm install
```

2. Setup Environment Variables
```
$ cp .env.example .env
```

3. Seed Database
```
$ npm run seed
```

4. Setup NPM Registry
Replace `YOUR_PERSONAL_TOKEN` with a classic personal token with `package:read` access.
```
$ cp .npmrc.example .npmrc
```

## Usage
```
npm start
```

## API Documentation
1. Start Server
2. Visit [localhost:3000/api/v1/documentation](http://localhost:3000/api/v1/documentation) for Swagger UI

## Shop Assets Export
The scenes assets are designed to be served from a CDN. A backup of the original files available from the CDN can be found at [drive.google.com](https://drive.google.com/file/d/1db55vUwWH-ttMBSQsRFyxbBcSgatbLg1/view?usp=sharing). 
