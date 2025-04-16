# Gepardec Gamertrack Frontend

This repository contains the frontend for the [Gepardec Gamertrack application](https://github.com/Gepardec/gepardec-gamertrack), which is a learning project for juniors. The application allows users to track their gameplay results across various games.

## Requirements

The following technologies are used:

- [Angular v19](https://angular.io/)
- [chart.js v4](https://www.chartjs.org/)
- [ng2-charts v8](https://valor-software.com/ng2-charts/)

In order to run, build and manage the projects dependencies 

- [@angular/cli](https://angular.dev/tools/cli)
- [npm](https://www.npmjs.com/)

are required

> [!NOTE]
> For convenience either to manage multiple npm/node versions or to easily update to a new version [nvm](https://github.com/nvm-sh/nvm) is recommended


## Run the application

After installing npm and angular cli, first all required dependencies need to be installed. This can be done by running the following command in the root directory of the project:

```bash
  npm install
```
After all dependencies are installed, you can run the application using the Angular CLI:

*Manual building beforehand is not required since the commands first run the required build steps it beforehand, as a development build.*
```bash
  ng serve
```

or 

```bash
  npm start
```
By default, the application is reachable under `http://localhost:4200/`.


## Building the project

### Development build
The development build is used for local development and testing. It includes source maps and other debugging features.
```bash
  ng build --configuration=development
```

### Production build
The production build is optimized for performance and does not include source maps. It is used for deploying the application to a production environment.
```bash
  ng build --configuration=production
```

### Running a production build

The production build can be run using a local server. This is useful for testing the production build locally before deploying it to a server.
```bash
 ng build --configuration=production && npx http-server -p 3000 -c-1 dist/gepardec-gamertrack-frontend/browser
```

## Containerize the application

The application can be containerized using Docker. This allows for easy deployment and scaling of the application.

From the root directory of the project, you can build the Docker image using the following command:
```bash
  docker build -t gepardec-gamertrack-frontend .
```

The image is build in two steps. First the application is build using the production build configuration. 
Then the application is copied into a nginx image and served using nginx.

### Running the Docker container
To run the Docker container, use the following command:
```bash
  docker run -d -p 8080:80 gepardec-gamertrack-frontend
```

### Deploying the Docker container

[gepardec-gamertrack-ci](https://github.com/Gepardec/gepardec-gamertrack-ci) contains the configuration for deploying the Docker container to OpenShift using GitHub Actions and Helm.

## Tweak to fit your needs

### Backend URI

Under `src/environments/environment.ts` and `src/environments/environment.development.ts` the backend, as well as the frontend origin segments can be set.

The values defined in src/environments/environment.ts (e.g., frontendOriginSegment and backendOriginSegment) are used by the ConfigService to modify the base URL.
ConfigService replaces the frontend segment in the current origin with the backend segment, allowing requests to the backend to be routed properly.
