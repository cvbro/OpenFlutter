FROM node as builder

WORKDIR /tmp

# Install Watchman
ENV WATCHMAN_VERSION=4.9.0
RUN apt update && apt install -y libssl-dev pkg-config libtool curl ca-certificates build-essential autoconf python-dev libpython-dev autotools-dev automake && \
    curl -LO https://github.com/facebook/watchman/archive/v${WATCHMAN_VERSION}.tar.gz && \
    tar xzf v${WATCHMAN_VERSION}.tar.gz && rm v${WATCHMAN_VERSION}.tar.gz && \
    cd watchman-${WATCHMAN_VERSION} && ./autogen.sh && ./configure && make && make install && \
    apt-get purge -y pkg-config curl ca-certificates build-essential autoconf python-dev libpython-dev autotools-dev automake libtool && \
    cd /tmp && rm -rf watchman-${WATCHMAN_VERSION}

RUN yarn config set registry https://registry.npm.taobao.org 

WORKDIR /usr/src/app/web
ADD web/package.json web/yarn.lock ./
RUN yarn install
COPY --chown=www-data web .
RUN yarn relay && yarn build

FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

# base
RUN apt-get update &&\
    apt-get install apt-transport-https apt-utils -y &&\
    apt-get install ca-certificates nodejs tzdata imagemagick ffmpeg -y &&\
    apt-get install build-essential ruby-dev libc-dev openssl libpq-dev libxml2-dev libxslt1-dev git curl nginx -y &&\
    rm /etc/nginx/sites-available/default &&\
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - &&\
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list &&\
    apt-get update && apt-get install yarn -y

# mirrors
RUN gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/ && \
    gem install bundler --no-rdoc --no-ri && \
    bundle config mirror.https://rubygems.org https://gems.ruby-china.com

RUN ln -sf /dev/stdout /var/log/nginx/access.log &&\
    ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

#ENTRYPOINT service nginx start && service cron start && tail -f /dev/null

WORKDIR /usr/src/app
RUN mkdir /usr/src/app/server
ADD server/Gemfile server/Gemfile.lock /usr/src/app/server/
RUN cd /usr/src/app/server && bundle install --deployment --jobs 20

RUN mkdir /usr/src/app/web

COPY --chown=www-data ./server /usr/src/app/server/
COPY --from=builder /usr/src/app/web ./web

ADD nginx.conf /etc/nginx/sites-enabled/default
