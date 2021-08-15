from rest_framework import serializers
from .models import  RequestGotFromFrontEnd
from .models import ResponseToFrontend

class RequestFromFrontEndSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestGotFromFrontEnd
        fields = ['command']

class ResponseToFrontendSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseToFrontend
        fields = ['image_index', 'image_path', 'image_year', 'image_event', 'total_number_of_images']