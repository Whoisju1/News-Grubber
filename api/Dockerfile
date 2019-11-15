FROM node:12

WORKDIR /api

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "-r", "dotenv/config", "./dist/index.js" ]
