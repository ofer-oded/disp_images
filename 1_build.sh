# build backend/frontend images and push to docker hub
cd docker
docker-compose build
docker-compose push
cd ..