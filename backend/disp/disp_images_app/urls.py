from django.urls import path
from . import views

urlpatterns = [
    path('index/',views.index),
    path('disp_images/',views.getImageURL ),
    path('download/<path:path>/',views.download)
]