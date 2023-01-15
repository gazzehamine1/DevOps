FROM node:18.12-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g @angular/cli

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . .

# generate build
RUN npm run build --prod

EXPOSE 4200


CMD ["ng", "serve","--host","0.0.0.0","--port","4200"]