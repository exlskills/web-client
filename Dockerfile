FROM node:8
WORKDIR /app
COPY . /app/
RUN cp .envprod .env
RUN cat .env
RUN npm install -g yarn
RUN yarn install
RUN yarn run build

FROM nginx:stable
RUN mkdir /usr/share/nginx/html/learn
COPY --from=0 /app/build /usr/share/nginx/html/learn
COPY prod-nginx.conf /etc/nginx/nginx.conf
COPY prod-nginx-site.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
