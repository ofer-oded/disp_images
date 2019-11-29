import os
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse,Http404
from django.conf import settings



def index(request):
    return HttpResponse("hello")

def download(request,path):
    if request.method == 'GET':
        file_path = os.path.join(settings.MEDIA_ROOT, path)
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="image/jpeg")
                response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                return response
        raise Http404

def getImageURL(request):
    img_url = 'http://127.0.0.1/IMG_0082.JPG'
    dic  = {
     "id": img_url
    }
    if request.method == 'GET':
        return JsonResponse(dic)
        

