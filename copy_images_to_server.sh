src_dir=/Users/oferoded/Documents/MySlides/
#dst_remote_dir=/var/lib/docker/volumes/docker-compose_media/_data/
dst_remote_dir=/home/itay/temp/

echo copy images from $src_dir to $dst_remote_dir
rsync -v $src_dir*.jpg itay@192.168.1.110:$dst_remote_dirdocker 