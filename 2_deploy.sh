# copy docker-compose.yml to remote host
# destination directory should exist
echo 'copy docker-compose yml and .env to remote host ...'
rsync ./docker/docker-compose.yml itay@10.0.0.21:/home/itay/docker-compose
rsync ./docker/.env  itay@10.0.0.21:/home/itay/docker-compose
rsync ./deploy_on_remote_host.sh itay@10.0.0.21:/home/itay
echo 'done'

# connecting to remote host
echo 'pulling images at remote host'
ssh itay@10.0.0.21 'chmod a+x deploy_on_remote_host.sh'
ssh itay@10.0.0.21 './deploy_on_remote_host.sh'





