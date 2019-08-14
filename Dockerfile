FROM node:12

WORKDIR /api

COPY / ./

COPY ./package.json ./

RUN npm i

RUN npm run build

CMD ["npm", "run", "start"]