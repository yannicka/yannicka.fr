FROM httpd:2-alpine

WORKDIR /var/yannicka

COPY . .

RUN apk add --update nodejs npm
RUN apk add --update nodejs npm tzdata icu-data-full

RUN npm install && npm run build && rm node_modules -r && mv public/* /usr/local/apache2/htdocs/

RUN apk del nodejs npm tzdata icu-data-full

EXPOSE 80

CMD [ "httpd-foreground" ]
