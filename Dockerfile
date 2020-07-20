FROM node:alpine

RUN mkdir -p /usr/src/darkroom

WORKDIR /usr/src/darkroom

COPY package*.json /usr/src/darkroom/

RUN npm install

COPY . /usr/src/darkroom

EXPOSE 3000

RUN npm install -g nodemon

CMD [ "nodemon", "app.js" ]