FROM phpmyadmin/phpmyadmin

RUN apk add --update nodejs npm \
    && npm install -g yarn

COPY config.inc.php /etc/phpmyadmin/config.inc.php

WORKDIR /

COPY package.json yarn.lock ./

RUN yarn install

EXPOSE 80