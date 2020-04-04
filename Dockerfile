# build stage
FROM node:10.16.2-alpine as build-stage
WORKDIR /
RUN npm install
RUN npm uninstall node-sass
RUN npm install node-sass
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]