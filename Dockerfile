FROM node:12 as client

WORKDIR /client

COPY ./client .

RUN npm run build

FROM node:12

WORKDIR /api

COPY ./api ./

RUN npm run build

COPY --from=client /client/build ./public

CMD [ "npm", "start" ]