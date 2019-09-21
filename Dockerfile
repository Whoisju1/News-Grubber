FROM node:alpine AS builder

WORKDIR /client

COPY /frontend/package.json .

COPY  /frontend/package-lock.json .

RUN npm i

COPY /frontend .

RUN npm run build

FROM node:12

WORKDIR /news-grubber

COPY --from=builder ./client/build ./public

COPY ./package.json .

COPY ./package-lock.json .

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
