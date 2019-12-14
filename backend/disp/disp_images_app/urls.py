from django.urls import path
from . import views

urlpatterns = [
    path('index/',views.index, name='index'),
    path('disp_images/',views.getImageURL, name='grap-image-url'),
    path('download/<path:path>/',views.download)
]