# La imagen base que va a usar para generar la nueva 
FROM php:8.2-apache
# Añade el módulo POO a la imagen acceder a bd.
RUN docker-php-ext-install pdo pdo_mysql

EXPOSE 80