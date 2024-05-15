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

## Deploy
[![VM Publish Production](https://github.com/VR-web-shop/Scenes/actions/workflows/vm-publish-production.yml/badge.svg)](https://github.com/VR-web-shop/Scenes/actions/workflows/vm-publish-production.yml)

The GitHub Workflow: [vm-publish-production.yml](/.github/workflows/vm-publish-production.yml); execute a CI/CD flow on push to main.

## Docker
1. Setup Environment Variables
```
$ cp .env.example .env
```

2. Setup npmrc File
```
$ cp .npmrc.example .npmrc
```

3. Build Docker Image
```
$ docker build -t scenes:v1.0 .
```

4. Run Docker Container
```
$ docker run -p 3003:3003 scenes:v1.0
```

## Docker Compose
1. Setup Environment Variables
```
$ cp .env.example .env
```

2. Setup npmrc File
```
$ cp .npmrc.example .npmrc
```

3. Build Docker Image
```
$ docker build -t scenes:v1.0 .
```

4. Save the image to a tar file
```
$ docker save -o scenes.tar scenes:v1.0
```

5. Load the image into Docker
```
$ docker load -i scenes.tar
```

6. Run Docker Compose
```
$ docker compose up
```
