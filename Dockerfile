FROM node:22-alpine AS build
WORKDIR /usr/src/app
#WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production

FROM --platform=$TARGETPLATFORM bitnami/nginx:1.27.3-debian-12-r5
COPY nginx.conf /opt/bitnami/nginx/conf/nginx.conf
COPY --from=build /usr/src/app/dist/gepardec-gamertrack-frontend/browser /opt/bitnami/nginx/html/

CMD ["/bin/bash", "-c", "nginx -g 'daemon off;'"]
