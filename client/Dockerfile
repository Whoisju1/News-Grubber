FROM tiangolo/node-frontend:10 as builder

WORKDIR /client

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY --from=builder /client/build /usr/share/nginx/html

COPY ./nginx/defaul.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [“nginx”, “-g”, “daemon off;”]
