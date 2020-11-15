FROM node:14

WORKDIR /api

EXPOSE 5000

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "-r", "dotenv/config", "./dist/index.js" ]
