FROM thenativeweb/wolkenkit-box-node:1.0.1
MAINTAINER the native web <hello@thenativeweb.io>

ADD . /console/

WORKDIR /console

# RUN npm install --production --silent && \
RUN npm install --silent && \
    npm run build && \
    rm -rf /tmp/* /root/.npm /root/.node-gyp

CMD [ "dumb-init", "node", "bin/wolkenkit-console.js" ]
