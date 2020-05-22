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
    dic = {'id': '', 'index':-1}

    s_image_index = request.GET['IMAGE_INDEX']
    if s_image_index == '':
        return _return_response(request,dic)
    
    image_index = int(s_image_index)
        
    if image_index == -1:
        __list_images = [f for f in  os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]
    
    if __list_images == []:
        return _return_response(request,dic)

    image_index = image_index +1
    if image_index == len(__list_images):
        image_index = 0

    img_url = f'{__list_images[image_index]}'
    dic['id'] = img_url
    dic['index']  = image_index
    return _return_response(request,dic)
    
    '''
    last_displayed_index = request.GET['IMAGE_INDEX']
    if last_displayed_index != '':
        last_displayed_index = int(request.GET['IMAGE_INDEX'])
    print (f'index {last_displayed_index}')

    __read_images_folder()
    if __current_image_index == -1:
        img_url = ''
    else:
        #img_url = f'{settings.DEV_URL}{__list_images[__current_image_index]}'
        img_url = f'{__list_images[__current_image_index]}'
        #print(f'{__current_image_index}/{len(__list_images)}')
        #print(img_url)
    
    #img_url = 'http://127.0.0.1/IMG_0082.JPG'
    dic  = {
     "id": img_url,
     "index": __current_image_index 
    }
    if request.method == 'GET':
        return JsonResponse(dic)
    '''

def _return_response(request,dic):
    if request.method == 'GET':
        return JsonResponse(dic)
    return None


def _read_image_folder(image_index:int):
    if image_index == -1:
        __list_images = [f for f in  os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]
    

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

    
        
    



