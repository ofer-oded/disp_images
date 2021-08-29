#pwd
#python manage.py runserver 0.0.0.0:8000  

#0.0.0.0 can mean "all IPv4 addresses on the local machine". If a host has two IP addresses, 192.168.1.1 and 10.1.2.1,\
# and a server running on the host is configured to listen on 0.0.0.0, \
# it will be reachable at both of those IP addresses.
 gunicorn --workers=1 disp_images_backend.wsgi:application --bind 0.0.0.0:8000 --timeout 120 

