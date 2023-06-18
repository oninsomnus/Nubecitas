FROM alpine:3.18.2
RUN apk update && apk upgrade
RUN apk add nodejs npm
RUN mkdir /usr/app && mkdir /usr/app/server 
WORKDIR /usr/app/server
COPY . .
RUN npm install
RUN /bin/sh -c 'node -v'
CMD ["node", "server.js"]
EXPOSE 3000