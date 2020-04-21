# build stage
FROM node:10.16.2-alpine as build-stage
COPY . .
WORKDIR /
RUN apk update && apk upgrade && \
    apk add --no-cache git
RUN npm install
RUN npm uninstall node-sass
RUN npm install node-sass

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /config/nginx/ecallerEpidemias_SSL.conf /etc/nginx/conf.d/
COPY --from=build-stage /config/certs /certs
COPY --from=build-stage /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
