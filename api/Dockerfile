FROM node:12

WORKDIR /api

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm build

CMD [ "node", "-r", "dotenv/config", "dist" ]
