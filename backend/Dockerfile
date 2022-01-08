# build environment
FROM node:latest as build-stage

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY ./ .

CMD ["node", "index"]

EXPOSE 3000