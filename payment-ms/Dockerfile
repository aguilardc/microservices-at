FROM node:20-alpine3.20

ARG BASE_DIR="payment-ms"

WORKDIR /app

COPY ${BASE_DIR}/package.json .

RUN npm install

COPY ${BASE_DIR}/. .

RUN npm run build

CMD ["npm", "run", "serve"]