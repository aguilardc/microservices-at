FROM node:16.1-alpine3.13

LABEL authors="Nevison Aguilar"

ARG BASE_DIR="gateway"

WORKDIR /app

COPY ${BASE_DIR}/package.json .

RUN npm install

COPY ${BASE_DIR}/. .

RUN npm run build

CMD ["npm", "run", "serve"]