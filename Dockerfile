FROM node:8
RUN apt-get update && apt-get install -y libssl-dev autoconf automake libtool python python-setuptools python-dev build-essential
WORKDIR /app
RUN git clone https://github.com/facebook/watchman.git \
    && cd watchman \
    && git checkout v4.9.0 \
    && ./autogen.sh \
    && ./configure \
    && make \
    && make install \
    && cd ..
COPY . /app/
RUN cp .envdefault .env
RUN yarn install
RUN yarn run relay
RUN yarn run build

FROM nginx:stable
RUN mkdir /usr/share/nginx/html/learn
COPY --from=0 /app/build /usr/share/nginx/html/learn
COPY --from=0 /app/favicons /usr/share/nginx/html/learn/favicons
COPY prod-nginx.conf /etc/nginx/nginx.conf
COPY prod-nginx-site.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
