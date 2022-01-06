FROM httpd:2-alpine

WORKDIR /var/yannicka

COPY . .

RUN apk add --update nodejs npm

RUN npm install && npm run build && rm node_modules -r && mv public/* /usr/local/apache2/htdocs/

RUN apk del nodejs npm

EXPOSE 80

CMD [ "httpd-foreground" ]
