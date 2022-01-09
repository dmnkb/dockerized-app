# build environment
FROM node:latest

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY ./ .

CMD ["node", "index"]

EXPOSE 5000