# build backend/frontend images and push to docker hub
cp ./disp_images_frontend/src/configs/base_prod_url.js ./disp_images_frontend/src/configs/base_url.js
cd docker
docker-compose build
docker-compose push
cd ..