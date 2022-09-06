FROM node:16-alpine

ENV CI=true
ENV WDS_SOCKER_PORT=0

WORKDIR /usr/app

COPY package.json /usr/app/
RUN npm install
COPY ./ /usr/app/

CMD ["npm", "start"]