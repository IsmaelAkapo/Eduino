# La imagen base que va a usar para generar la nueva
FROM php:8.2-apache
# Añade el módulo POO a la imagen acceder a bd.
RUN docker-php-ext-install pdo pdo_mysql

# Copia el código de la API dentro de la imagen.
# En local docker-compose monta ./api encima por volumen, así que esto no molesta;
# en producción (Render, Railway...) NO hay volumen, y sin esta línea Apache serviría
# un directorio vacío.
COPY api/ /var/www/html/

EXPOSE 80

# Los hosting gratuitos imponen el puerto por la variable PORT. Apache escucha en 80 por
# defecto, así que lo reescribimos al arrancar. Si PORT no existe (caso local), se queda en 80.
CMD ["sh", "-c", "sed -i \"s/^Listen 80$/Listen ${PORT:-80}/\" /etc/apache2/ports.conf && sed -i \"s/:80>/:${PORT:-80}>/\" /etc/apache2/sites-available/000-default.conf && apache2-foreground"]
