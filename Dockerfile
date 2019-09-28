FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /client

COPY ./client/package.json .
COPY ./client/package-lock.json .

RUN npm install

COPY ./client .

RUN npm run build

FROM node:12

WORKDIR /api

COPY ./client/package.json .
COPY ./client/package-lock.json .

RUN npm install

COPY ./api ./

RUN npm run build

COPY --from=build-stage /client/build ./public

CMD [ "npm", "start" ]