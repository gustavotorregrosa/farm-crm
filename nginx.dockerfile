FROM nginx:latest
COPY /laravel-backend /var/www
COPY /config-nginx/nginx.conf /etc/nginx/nginx.conf