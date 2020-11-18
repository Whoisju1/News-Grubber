FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /client

COPY ./client/package.json .
COPY ./client/package-lock.json .

RUN npm install

COPY ./client .

RUN npm run build

FROM node:13

WORKDIR /api

COPY ./client/package.json .
COPY ./client/package-lock.json .

RUN npm install

COPY ./api ./

RUN npm install @babel/cli @babel/core @babel/preset-env @babel/register

RUN npm run build

COPY --from=build-stage /client/build ./public

CMD [ "npm", "start" ]
