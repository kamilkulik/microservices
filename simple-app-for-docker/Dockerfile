# Base image

FROM node:alpine
WORKDIR /usr/app

# Install dependencies
COPY ./package.json /usr/app
RUN npm install
COPY ./ /usr/app/

# Default Command
CMD ["npm", "start"]