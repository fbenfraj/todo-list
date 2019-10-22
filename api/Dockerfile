FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm install -g nodemon
RUN npm install
RUN cd node_modules
RUN pwd
RUN ls

COPY . .

EXPOSE 8000
CMD ["npm", "run", "dev"]
