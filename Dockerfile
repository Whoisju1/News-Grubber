FROM node:latest

WORKDIR /api

COPY ./package.json .

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]