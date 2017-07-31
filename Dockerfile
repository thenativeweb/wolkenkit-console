FROM thenativeweb/wolkenkit-box-node:1.0.1
MAINTAINER the native web <hello@thenativeweb.io>

ADD . /console/

WORKDIR /console

RUN npm install --production --silent

CMD [ "npm", "start" ]
