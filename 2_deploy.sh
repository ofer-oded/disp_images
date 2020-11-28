# copy docker-compose.yml to remote host
# destination directory should exist
echo 'copy docker-compose yml and .env to remote host ...'
rsync ./docker/.env  itay@192.168.1.116:/home/itay/docker-compose
if [ $? == 0 ]
then
    echo done
else
    echo failed
    exit 1
fi

echo "copy docker-compose yml to remote host"
rsync ./docker/docker-compose_no_build.yml itay@192.168.1.116:/home/itay/docker-compose/docker-compose.yml
if [ $? == 0 ]
then
    echo done
else
    echo failed
    exit 1
fi

echo "copy deploy script to remote host"
rsync ./deploy_on_remote_host.sh itay@192.168.1.116:/home/itay
if [ $? == 0 ]
then
    echo done
else
    echo failed
    exit 1
fi

# connecting to remote host
echo 'Running deploy script on remote host remote host'
ssh itay@192.168.1.116 'chmod a+x deploy_on_remote_host.sh'
if [ $? == 0 ]
then
    echo done
else
    echo failed
    exit 1
fi
ssh itay@192.168.1.116 './deploy_on_remote_host.sh'
if [ $? == 0 ]
then
    echo done
else
    echo failed
    exit 1
fi





