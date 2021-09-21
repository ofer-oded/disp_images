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

# RUN echo "# configure nginx as proxy server to backend" >> /etc/nginx/conf.d/default.conf
# RUN echo "location /api {" >> /etc/nginx/conf.d/default.conf
# RUN echo "proxy_pass http://disp-images-backend:8000;" >> /etc/nginx/conf.d/default.conf
# RUN echo "}" >> /etc/nginx/conf.d/default.conf

COPY --from=build /usr/apps/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

