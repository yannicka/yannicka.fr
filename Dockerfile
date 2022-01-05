FROM httpd:2-alpine

COPY . /var/yannicka

RUN apk add --update nodejs npm

RUN cd /var/yannicka && npm install && npm run build && mv public/* /usr/local/apache2/htdocs/

EXPOSE 80

CMD [ "httpd-foreground" ]
