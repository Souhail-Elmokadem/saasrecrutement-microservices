# Étape 1 : Build Angular
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build -- --configuration production --project=recrutementsaas

# Étape 2 : Serveur Nginx
FROM nginx:alpine
COPY --from=build /app/dist/recrutementsaas/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
