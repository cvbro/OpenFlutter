FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

# base
RUN apt-get update &&\
    apt-get install apt-transport-https apt-utils -y &&\
    apt-get install ca-certificates nodejs tzdata imagemagick -y &&\
    apt-get install build-essential ruby-dev libc-dev openssl libpq-dev libxml2-dev libxslt1-dev git curl nginx -y &&\
    rm /etc/nginx/sites-available/default &&\
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - &&\
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list &&\
    apt-get update && apt-get install yarn -y

# passenger
RUN apt-get install -y dirmngr gnupg && \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7 && \
    apt-get install -y apt-transport-https ca-certificates && \
    sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger bionic main > /etc/apt/sources.list.d/passenger.list' && \
    apt-get update && \
    apt-get install -y libnginx-mod-http-passenger && \
    apt-get remove -y dirmngr gnupg && \
    apt-get autoremove -y && \
    apt-get clean

# mirrors
RUN gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/ && \
    gem install bundler --no-rdoc --no-ri && \
    bundle config mirror.https://rubygems.org https://gems.ruby-china.com &&\
    yarn config set registry https://registry.npm.taobao.org

RUN ln -sf /dev/stdout /var/log/nginx/access.log &&\
    ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

#ENTRYPOINT service nginx start && service cron start && tail -f /dev/null

WORKDIR /usr/src/app
RUN mkdir /usr/src/app/server
ADD server/Gemfile server/Gemfile.lock /usr/src/app/server/
RUN cd /usr/src/app/server && bundle install --deployment --jobs 20

RUN mkdir /usr/src/app/web
ADD web/package.json web/yarn.lock /usr/src/app/web/
RUN cd web && yarn

COPY --chown=www-data . /usr/src/app/
RUN cd web && yarn build

ADD nginx.conf /etc/nginx/sites-enabled/default
