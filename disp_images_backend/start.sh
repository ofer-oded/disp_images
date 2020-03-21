#pwd
#python manage.py runserver 0.0.0.0:8000  

 gunicorn --workers=8 disp_images_backend.wsgi:application --bind 0.0.0.0:8000 --timeout 120 

