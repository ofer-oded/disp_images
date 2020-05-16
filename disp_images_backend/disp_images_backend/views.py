import os
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse,Http404
from django.conf import settings

__list_images = []
__current_image_index = -1

def index(request):
    return HttpResponse("hello")
'''
def download(request,path):
    if request.method == 'GET':
        file_path = os.path.join(settings.MEDIA_ROOT, path)
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="image/jpeg")
                response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                return response
        raise Http404
'''
def getImageURL(request):
    global __current_image_index
    global __list_images

    __read_images_folder()
    if __current_image_index == -1:
        img_url = ''
    else:
        #img_url = f'{settings.DEV_URL}{__list_images[__current_image_index]}'
        img_url = f'{__list_images[__current_image_index]}'
        print(f'{__current_image_index}/{len(__list_images)}')
        print(img_url)
    
    #img_url = 'http://127.0.0.1/IMG_0082.JPG'
    dic  = {
     "id": img_url
    }
    if request.method == 'GET':
        return JsonResponse(dic)
        
def __read_images_folder() -> None:
    global __current_image_index
    global __list_images
    if  __current_image_index == -1:
        __list_images = [f for f in  os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]
    
    if __list_images == []:
        __current_image_index = -1
        return

    max_index = len(__list_images) - 1
    if __current_image_index < max_index:
        __current_image_index = __current_image_index + 1
    else:
        __current_image_index = 0

    
        
    



