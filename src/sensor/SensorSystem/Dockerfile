FROM node:alpine
WORKDIR /usr/app
COPY . /usr/app
RUN npm install\
    && npm install typescript -g
RUN tsc
CMD ["node", "./system.js"]