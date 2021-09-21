### STAGE 1: Build ###
# base image
FROM node:16.13.2 as build

# set working directory
WORKDIR /usr/apps
# copy all 
COPY   . .

# install from the package lock file
RUN npm ci
# build
RUN npm run prod

### STAGE 2: Run ###
# production environment
FROM nginx:1.17.1-alpine
COPY --from=build /usr/apps/dist/apps/disp-images-angular-frontend /usr/share/nginx/html

