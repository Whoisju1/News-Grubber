FROM tiangolo/node-frontend:10 AS builder

WORKDIR /client

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN [ "npm", "run", "build" ]

FROM nginx

COPY --from=builder ./client/build /usr/share/nginx/html

EXPOSE 80

CMD [“nginx”, “-g”, “daemon off;”]

