import os
import glob
from pathlib import Path
from django.shortcuts import render
from typing import Generator
from django.http import HttpResponse, JsonResponse, Http404
from django.conf import settings

__list_images = []
__current_image_index = -1
__gen = None  # type: Generator
__number_of_images = 0



def index(request)-> HttpResponse:
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



def get_next_image_name(request):
    dic = {'image_name': '', 'image_index': -1, 'total_number_of_images': 0}
    global __gen
    global __number_of_images

    command_from_frontend = request.GET['command']

    if command_from_frontend == 'RESTART':
        __gen = None
        return _return_response(request, dic)
    elif command_from_frontend == 'GET_NEXT_IMAGE_NAME':
        if not __gen:
            __number_of_images = _get_number_of_images()
            if __number_of_images <= 0:
                print("no images were found")
                return _return_response(request, dic)
            __gen = _load_images()
        try:
            return _return_response(request,_fill_resonse(next(__gen)))
        except StopIteration:
            __gen = _load_images()
        return _return_response(request,_fill_resonse(next(__gen)))
    else:
        print('got unknown command')
        return _return_response(request,dic)

def _load_images() -> Generator[dict,None,None]:
    dic = {"index": 0,"image_name": "", "year":"2000", "event": "event"}
    i = -1
    media_folder_path = os.path.join(os.getcwd(), settings.MEDIA_ROOT)
    for f in glob.iglob(media_folder_path + '**/**', recursive=True):
        if f.upper().endswith('.JPG'):
            i += 1
            dic["index"] = i
            dic["image_name"] = _extract_image_name_and_its_folder_name(f)
            year, event = _extract_year_event(f)
            dic["year"] = year
            dic["event"] = event
            yield dic

def _extract_image_name_and_its_folder_name(full_image_name:str) -> str:
    path = Path(full_image_name)
    return os.path.join(path.parts[-2], path.parts[-1])

def _extract_year_event(full_image_name:str) -> tuple:
    path = Path(full_image_name)
    parent_folder_name = path.parts[-2]
    year = parent_folder_name.split("__")[0]
    event = parent_folder_name.split("__")[1]
    return year, event


def _get_number_of_images() -> int:
    i = 0
    media_folder_path = os.path.join(os.getcwd(), settings.MEDIA_ROOT)
    for f in glob.iglob(media_folder_path + '**/**', recursive=True):
        if f.upper().endswith('.JPG'):
            i += 1
    return i

def _fill_resonse(image_details:dict) -> dict:
    global __number_of_images
    return {'image_name': image_details['image_name'], 'image_index': image_details['index'],
            'year': image_details['year'], 'event': image_details['event'],
            'total_number_of_images': __number_of_images}


def getImageURL(request):
    global __current_image_index
    global __list_images
    dic = {'id': '', 'index': -1}

    s_image_index = request.GET['IMAGE_INDEX']
    if s_image_index == '':
        return _return_response(request, dic)

    image_index = int(s_image_index)

    if image_index == -2:
        if __list_images == []:
            __list_images = [f for f in os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]
            __current_image_index = -1

        if __list_images == []:
            return _return_response(request, dic)

        __current_image_index = (__current_image_index + 1) % len(__list_images)
        img_url = __list_images[__current_image_index]
        dic['id'] = img_url
        dic['index'] = image_index
        return _return_response(request, dic)

    if image_index == -1:
        __list_images = [f for f in os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]

    if __list_images == []:
        return _return_response(request, dic)

    image_index = image_index + 1
    if image_index == len(__list_images):
        image_index = 0

    img_url = f'{__list_images[image_index]}'
    dic['id'] = img_url
    dic['index'] = image_index
    return _return_response(request, dic)

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


def _return_response(request, dic):
    if request.method == 'GET':
        return JsonResponse(dic)
    return None


def _read_image_folder(image_index: int):
    if image_index == -1:
        __list_images = [f for f in os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]


def __read_images_folder() -> None:
    global __current_image_index
    global __list_images
    if __current_image_index == -1:
        __list_images = [f for f in os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]
        print(f'number of images is {len(__list_images)}')

    if __list_images == []:
        __current_image_index = -1
        return

    max_index = len(__list_images) - 1
    if __current_image_index < max_index:
        __current_image_index = __current_image_index + 1
    else:
        __current_image_index = 0
