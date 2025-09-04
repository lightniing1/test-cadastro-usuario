FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Substitua 'your-angular-project-name' pelo nome do seu projeto no angular.json
RUN npm run build -- --configuration production

FROM nginx:stable-alpine

COPY --from=builder /app/dist/userhub_frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80