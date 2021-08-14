import os
import glob
from pathlib import Path

from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import render
from typing import Generator, List
from django.http import HttpResponse, JsonResponse, HttpRequest,  Http404
from django.conf import settings

class ImageDetails():
    """
    contain context details about the image
    """
    def __init__(self, name:str, year:int, event: str ):
        """
        init
        """
        self.name = name
        self.year = year
        self.event = event

class FetchImages():
    current_image_index = -1
    def __init__(self):
        """

        """
        # load all images
        self._all_image_details = FetchImages._load_image_details()
        FetchImages.current_image_index = -1

    def reload_image_details(self):
        self._all_image_details = FetchImages._load_image_details()

    def get_next_image_details(self) -> ImageDetails:
        """
        retrieve the next image details from list
        :return:
        """
        if len(self._all_image_details) == 0:
            print("list of image details is empty")
            return ImageDetails("",2000,"")

        next_index = (FetchImages.current_image_index + 1) % len(self._all_image_details)
        # update state
        FetchImages.current_image_index = next_index
        print(f"get image index: {FetchImages.current_image_index}")
        return self._all_image_details[next_index]

    def get_prev_image_details(self) -> ImageDetails:
        """
        retrieve the prev image details from list
        :return:
        """
        if len(self._all_image_details) == 0:
            print("list of image details is empty")
            return ImageDetails("",2000,"")

        # update state
        if FetchImages.current_image_index == -1:
            FetchImages.current_image_index = len(self._all_image_details)

        prev_index = (FetchImages.current_image_index - 1) % len(self._all_image_details)
        FetchImages.current_image_index = prev_index
        print(f"get image index: {FetchImages.current_image_index}")
        return self._all_image_details[prev_index]

    def get_number_of_images(self) -> int:
        print(f'number of image details read is: {len(self._all_image_details)}')
        return len(self._all_image_details)

    @staticmethod
    def _load_image_details() -> list:
        """
        load all images names contained at media folder into a dictionary
         images should be at folders.
         folder name foormat: year__eventName
        :return:
        """
        lst_of_images_details = []
        media_folder_path = os.path.join(os.getcwd(), settings.MEDIA_ROOT)
        for f in sorted(glob.iglob(media_folder_path + '**/**', recursive=True)):
            if f.upper().endswith('.JPG'):
                image_name = FetchImages._extract_image_name_and_its_folder_name(f)
                year, event = FetchImages._extract_year_event(f)
                image_details = ImageDetails(image_name, year, event)
                lst_of_images_details.append(image_details)
        return lst_of_images_details

    @staticmethod
    def _extract_image_name_and_its_folder_name(full_image_name:str) -> str:
        path = Path(full_image_name)
        return os.path.join(path.parts[-2], path.parts[-1])

    @staticmethod
    def _extract_year_event(full_image_name:str) -> tuple:
        path = Path(full_image_name)
        parent_folder_name = path.parts[-2]
        year = parent_folder_name.split("__")[0]
        event = parent_folder_name.split("__")[1]
        return year, event


class ResponseToFrontEnd():
    """
    this class contains all the fields contained i a response to the frontend
    """

    def __init__(self, image_index: int, image_path: str, image_year: int, image_event: str, total_number_of_images: int):
        self.image_index = image_index
        self.image_path = image_path
        self.image_year = image_year
        self.image_event = image_event
        self.total_number_of_images = total_number_of_images


class RequestCommands():
    READ_IMAGE_DETAILS = "read_image_details"
    GET_NEXT_IMAGE_DETAILS = "get_next_image_details"
    GET_PREV_IMAGE_DETAILS = "get_prev_image_details"


__list_images = []
__gen = None  # type: Generator
__number_of_images = 0
# this will load all image details at backend startup
fetch_images = FetchImages()


def index(request)-> HttpResponse:
    return HttpResponse("disp_images_site")


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




# def get_image_details(request:WSGIRequest)-> JsonResponse:
#     # return response which contains only number of images if not a GET request
#     if request.method != 'GET':
#         print("response to non GET request")
#         response = response_to_read_image_details_request(-1, fetch_images.get_number_of_images())
#         # return as json to frontend
#         return _return_response(response.__dict__)
#
#     command_from_frontend = request.GET['command']
#     if command_from_frontend == RequestCommands.READ_IMAGE_DETAILS:
#         print(f"request command: {command_from_frontend}")
#         # reload images details
#         fetch_images.reload_image_details()
#         # creates the response object
#         response = response_to_read_image_details_request(FetchImages.current_image_index, fetch_images.get_number_of_images())
#         # return as json to frontend
#         return _return_response(response.__dict__)
#
#     if command_from_frontend == RequestCommands.GET_NEXT_IMAGE_DETAILS:
#         print(f"request command: {command_from_frontend}")
#         # get next image details
#         image_details = fetch_images.get_next_image_details()
#         # creates a response object
#         response = response_to_prev_or_next_commands(FetchImages.current_image_index, image_details, fetch_images.get_number_of_images())
#         # return json to frontend
#         return _return_response(response.__dict__)
#
#     if command_from_frontend == RequestCommands.GET_PREV_IMAGE_DETAILS:
#         print(f"request command: {command_from_frontend}")
#         # get prev image details
#         image_details  = fetch_images.get_prev_image_details()
#         # creates a response object
#         response = response_to_prev_or_next_commands(FetchImages.current_image_index, image_details, fetch_images.get_number_of_images())
#         # return json to frontend
#         return _return_response(response.__dict__)
#
#     print(f"unknown command: {command_from_frontend}")
#     # return response which contains only number of images
#     response = response_to_read_image_details_request(-1, fetch_images.get_number_of_images())
#     # return as json to frontend
#     return _return_response(response.__dict__)
#
#
# def response_to_read_image_details_request(image_index: int,total_number_of_images: int) -> ResponseToFrontEnd:
#     """
#     return ResponseToFrontEnd object for request command READ_IMAGE_DETAILS
#     :param total_number_of_images:
#     :return:
#     """
#     return ResponseToFrontEnd(image_index=image_index, image_path="", image_year=2000, image_event="",
#                               total_number_of_images=total_number_of_images)
#
#
# def response_to_prev_or_next_commands(image_index: int, image_details: ImageDetails,
#                                       total_number_of_images: int) -> ResponseToFrontEnd:
#     """
#     return ResponseToFrontEnd for a prev/next request commands GET_NEXT_IMAGE_DETAILS, GET_PREV_IMAGE_DETAILS
#     :param image_details:
#     :return:
#     """
#     return ResponseToFrontEnd(image_index=image_index, image_path=image_details.name, image_year=image_details.year,
#                               image_event=image_details.event, total_number_of_images=total_number_of_images)
#
# def get_next_image_name(request):
#     dic = {'image_name': '', 'image_index': -1, 'total_number_of_images': 0}
#     global __gen
#     global __number_of_images
#
#     command_from_frontend = request.GET['command']
#
#     if command_from_frontend == 'RESTART':
#         __gen = None
#         return _return_response(request, dic)
#     elif command_from_frontend == 'GET_NEXT_IMAGE_NAME':
#         if not __gen:
#             __number_of_images = _get_number_of_images()
#             if __number_of_images <= 0:
#                 print("no images were found")
#                 return _return_response(request, dic)
#             __gen = _load_images()
#         try:
#             return _return_response(request,_fill_resonse(next(__gen)))
#         except StopIteration:
#             __gen = _load_images()
#         return _return_response(request,_fill_resonse(next(__gen)))
#     else:
#         print('got unknown command')
#         return _return_response(request,dic)
#
# def _load_images() -> Generator[dict,None,None]:
#     dic = {"index": 0,"image_name": "", "year":"2000", "event": "event"}
#     i = -1
#     media_folder_path = os.path.join(os.getcwd(), settings.MEDIA_ROOT)
#     for f in glob.iglob(media_folder_path + '**/**', recursive=True):
#         if f.upper().endswith('.JPG'):
#             i += 1
#             dic["index"] = i
#             dic["image_name"] = _extract_image_name_and_its_folder_name(f)
#             year, event = _extract_year_event(f)
#             dic["year"] = year
#             dic["event"] = event
#             yield dic
#
#
# def _get_number_of_images() -> int:
#     i = 0
#     media_folder_path = os.path.join(os.getcwd(), settings.MEDIA_ROOT)
#     for f in glob.iglob(media_folder_path + '**/**', recursive=True):
#         if f.upper().endswith('.JPG'):
#             i += 1
#     return i
#
# def _fill_resonse(image_details:dict) -> dict:
#     global __number_of_images
#     return {'image_name': image_details['image_name'], 'image_index': image_details['index'],
#             'year': image_details['year'], 'event': image_details['event'],
#             'total_number_of_images': __number_of_images}
#
#
# def getImageURL(request):
#     global _current_image_index
#     global __list_images
#     dic = {'id': '', 'index': -1}
#
#     s_image_index = request.GET['IMAGE_INDEX']
#     if s_image_index == '':
#         return _return_response(request, dic)
#
#     image_index = int(s_image_index)
#
#     if image_index == -2:
#         if __list_images == []:
#             __list_images = [f for f in os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]
#             _current_image_index = -1
#
#         if __list_images == []:
#             return _return_response(request, dic)
#
#         _current_image_index = (_current_image_index + 1) % len(__list_images)
#         img_url = __list_images[_current_image_index]
#         dic['id'] = img_url
#         dic['index'] = image_index
#         return _return_response(request, dic)
#
#     if image_index == -1:
#         __list_images = [f for f in os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]
#
#     if __list_images == []:
#         return _return_response(request, dic)
#
#     image_index = image_index + 1
#     if image_index == len(__list_images):
#         image_index = 0
#
#     img_url = f'{__list_images[image_index]}'
#     dic['id'] = img_url
#     dic['index'] = image_index
#     return _return_response(request, dic)
#
#     '''
#     last_displayed_index = request.GET['IMAGE_INDEX']
#     if last_displayed_index != '':
#         last_displayed_index = int(request.GET['IMAGE_INDEX'])
#     print (f'index {last_displayed_index}')
#
#     __read_images_folder()
#     if current_image_index == -1:
#         img_url = ''
#     else:
#         #img_url = f'{settings.DEV_URL}{__list_images[current_image_index]}'
#         img_url = f'{__list_images[current_image_index]}'
#         #print(f'{current_image_index}/{len(__list_images)}')
#         #print(img_url)
#
#     #img_url = 'http://127.0.0.1/IMG_0082.JPG'
#     dic  = {
#      "id": img_url,
#      "index": current_image_index
#     }
#     if request.method == 'GET':
#         return JsonResponse(dic)
#     '''
#
#
# def _return_response(dic: dict) -> JsonResponse:
#     # if request.method == 'GET':
#     return JsonResponse(dic)
#     # return None
#
#
# def _read_image_folder(image_index: int):
#     if image_index == -1:
#         __list_images = [f for f in os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]
#
# def __read_images_folder() -> None:
#     global _current_image_index
#     global __list_images
#     if _current_image_index == -1:
#         __list_images = [f for f in os.listdir(settings.MEDIA_ROOT) if f.upper().endswith('.JPG')]
#         print(f'number of images is {len(__list_images)}')
#
#     if __list_images == []:
#         _current_image_index = -1
#         return
#
#     max_index = len(__list_images) - 1
#     if _current_image_index < max_index:
#         _current_image_index = _current_image_index + 1
#     else:
#         _current_image_index = 0





