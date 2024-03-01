FROM --platform=linux/amd64 node:lts-alpine as build-stage

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY [".env", "package*.json"]

USER node

# Copy your code in the docker image
COPY . /home/node/app

# Install app dependencies
COPY package*.json ./

# set permission for the folder
COPY --chown=node:node . .

RUN npm config set registry=https://registry.npmjs.com/

RUN npm install --legacy-peer-deps --verbose

EXPOSE 3090

RUN npm run build

RUN npm run test

CMD [ "npm", "run", "clean-start" ]