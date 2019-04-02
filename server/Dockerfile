FROM ruby:2.5.1

ENV DEBIAN_FRONTEND noninteractive

RUN gem update bundler

# linux-headers
RUN apt-get update
RUN    apt-get install apt-utils ca-certificates nodejs tzdata imagemagick -y
RUN    apt-get install build-essential ruby-dev libc-dev openssl libpq-dev libxml2-dev libxslt1-dev git curl nginx -y
RUN    rm /etc/nginx/sites-available/default

WORKDIR /usr/src/app

ADD Gemfile Gemfile.lock /usr/src/app/

RUN bundle install --deployment --jobs 20 --retry 5 &&\
    find /usr/src/app/server/vendor/bundle -name tmp -type d -exec rm -rf {} +
