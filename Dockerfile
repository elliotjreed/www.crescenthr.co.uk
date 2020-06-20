FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./humans.txt /usr/share/nginx/html/humans.txt
COPY ./robots.txt /usr/share/nginx/html/robots.txt
COPY ./favicon.ico /usr/share/nginx/html/favicon.ico

