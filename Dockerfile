FROM node:20-alpine as base

WORKDIR /api

COPY package.json /api

RUN npm install

COPY . /api

CMD ["npm", "dev"]