cd docker-compose
echo "down current running docker containers"
docker-compose down
echo "pulling new images"
docker-compose pull
if [ $? == 0 ]
then
    echo done
else
    echo failed
    exit 1
fi
echo "up docker containers"
docker-compose up -d
if [ $? == 0 ]
then
    echo done
    exit 0
else
    echo failed
    exit 1
fi