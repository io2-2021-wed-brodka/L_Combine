FROM node:latest as build-step

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm ci
RUN npm run build --prod

FROM nginx:latest
COPY --from=build-step /app/dist/UserTech /usr/share/nginx/html

EXPOSE 80
