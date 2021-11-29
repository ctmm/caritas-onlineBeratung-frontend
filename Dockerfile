FROM docker.pkg.github.com/caritasdeutschland/caritas-onlineberatung-nginx/nginx-image:dockerimage.v.1
COPY beratung-hilfe.html /usr/share/nginx/html/
COPY error.404.html /usr/share/nginx/html/
COPY error.500.html /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/
COPY index.html /usr/share/nginx/html/
COPY login.html /usr/share/nginx/html/
COPY logo192.png /usr/share/nginx/html/
COPY logo512.png /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY src /usr/share/nginx/html/
COPY static /usr/share/nginx/html/
COPY under-construction.html /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
