FROM alpine:3.18.2
RUN apk update && apk upgrade
RUN apk add nodejs npm
RUN mkdir /usr/app && mkdir /usr/app/server
WORKDIR /usr/app/server
COPY . .
RUN npm install
CMD ["npm", "run", "start:dev"]
EXPOSE 3000