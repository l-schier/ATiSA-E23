FROM node:alpine
    WORKDIR /usr/sensor-consumer
    COPY . .
    RUN npm install\
        && npm install typescript -g
    RUN tsc
    CMD ["node", "./dist/system.js"]