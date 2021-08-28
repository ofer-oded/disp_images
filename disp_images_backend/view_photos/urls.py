from django.urls import path
from . import views

urlpatterns = [
    # urlpatterns for REST API calls
    # ex: http://127.0.0.1:8000/view_photos
    path('', views.index),
    # ex: http://localhost:8000/view_photos/get_image_details/?command=UNKOWN_COMMAND
    path('get_image_details/',views.get_image_details)
]