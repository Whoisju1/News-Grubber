FROM tiangolo/node-frontend:10 as builder

WORKDIR /client

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY --from=builder ./client/build /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d

COPY --from=builder ./certs/server.crt /etc/nginx/certs/server.crt
COPY --from=builder ./certs/server.key /etc/nginx/certs/server.key

EXPOSE 80
