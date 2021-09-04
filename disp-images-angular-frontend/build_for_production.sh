# build into backend static folder
ng build --prod --output-path ../disp_images_backend/disp_images_backend/static/ang --output-hashing none
if [ $? != 0 ]
then
    echo "failed to build Angular App"
    exit 1
fi
exit 0
