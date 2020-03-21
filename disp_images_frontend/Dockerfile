# base image
FROM node:12.12.0 as build

# set working directory
WORKDIR /usr/apps
COPY   package*.json /usr/apps/

RUN npm install --loglevel verbose

COPY ./ /usr/apps/

RUN npm run build

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/apps/node_modules/.bin:$PATH


# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /usr/apps/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

