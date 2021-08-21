import os
from django.http import HttpResponse
from django.conf import settings
import glob
from pathlib import Path

from django.core.handlers.wsgi import WSGIRequest
from .models import ResponseToFrontend

from .serializers import RequestFromFrontEndSerializer
from .serializers import ResponseToFrontendSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


# class ResponseToFrontEnd:
#     """
#     this class contains all the fields contained i a response to the frontend
#     """
#
#     def __init__(self, image_index: int, image_path: str, image_year: int, image_event: str,
#                  total_number_of_images: int):
#         self.image_index = image_index
#         self.image_path = image_path
#         self.image_year = image_year
#         self.image_event = image_event
#         self.total_number_of_images = total_number_of_images


class ImageDetails:
    """
    contain context details about the image
    """
    def __init__(self, name: str, year: int, event: str):
        """
        init
        """
        self.name = name
        self.year = year
        self.event = event


class FetchImages:
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
            return ImageDetails("", 2000, "")

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
            return ImageDetails("", 2000, "")

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
         folder name format: year__eventName
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
    def _extract_image_name_and_its_folder_name(full_image_name: str) -> str:
        path = Path(full_image_name)
        return os.path.join(path.parts[-2], path.parts[-1])

    @staticmethod
    def _extract_year_event(full_image_name: str) -> tuple:
        path = Path(full_image_name)
        parent_folder_name = path.parts[-2]
        year = parent_folder_name.split("__")[0]
        event = parent_folder_name.split("__")[1]
        return year, event


class RequestCommands:
    READ_IMAGE_DETAILS = "read_image_details"
    GET_NEXT_IMAGE_DETAILS = "get_next_image_details"
    GET_PREV_IMAGE_DETAILS = "get_prev_image_details"


fetch_images = FetchImages()


def index(request: WSGIRequest) -> HttpResponse:
    return HttpResponse("view_photos_app")


@api_view(['GET'])
def get_image_details(request: WSGIRequest) -> Response:
    # return response which contains only number of images if not a GET request
    if request.method != 'GET':
        print("response to non GET request")
        response_to_frontend : ResponseToFrontend = _response_to_read_image_details_request(-1, fetch_images.get_number_of_images())
        # serialization will define which fields at response_to_frontend will be at the Json created
        serialized: ResponseToFrontendSerializer = ResponseToFrontendSerializer(response_to_frontend)
        # return response to frontend as json
        return Response(serialized.data, status=status.HTTP_200_OK)

    serialzer = RequestFromFrontEndSerializer(request.GET)
    command_from_frontend = serialzer.data['command']
    if command_from_frontend == RequestCommands.READ_IMAGE_DETAILS:
        print(f"request command: {command_from_frontend}")
        # reload images details
        fetch_images.reload_image_details()
        # creates the response object
        response_to_frontend: ResponseToFrontend = _response_to_read_image_details_request(FetchImages.current_image_index,
                                                           fetch_images.get_number_of_images())
        # serialization will define which fields at response_to_frontend will be at the Json created
        serialized: ResponseToFrontendSerializer = ResponseToFrontendSerializer(response_to_frontend)
        # return response to frontend as json
        return Response(serialized.data, status=status.HTTP_200_OK )

    if command_from_frontend == RequestCommands.GET_NEXT_IMAGE_DETAILS:
        print(f"request command: {command_from_frontend}")
        # get next image details
        image_details = fetch_images.get_next_image_details()
        # creates a response model object
        response_to_frontend: ResponseToFrontend = _response_to_prev_or_next_commands(FetchImages.current_image_index, image_details,
                                                      fetch_images.get_number_of_images())
        # serialization will define which fields at response_to_frontend will be at the Json created
        serialized: ResponseToFrontendSerializer = ResponseToFrontendSerializer(response_to_frontend)
        # return response to frontend as json
        return Response(serialized.data, status=status.HTTP_200_OK )

    if command_from_frontend == RequestCommands.GET_PREV_IMAGE_DETAILS:
        print(f"request command: {command_from_frontend}")
        # get prev image details
        image_details = fetch_images.get_prev_image_details()
        # creates a response object
        response_to_frontend = _response_to_prev_or_next_commands(FetchImages.current_image_index, image_details,
                                                      fetch_images.get_number_of_images())
        # serialization will define which fields at response_to_frontend will be at the Json created
        serialized: ResponseToFrontendSerializer = ResponseToFrontendSerializer(response_to_frontend)
        # return response to frontend as json
        return Response(serialized.data, status=status.HTTP_200_OK)

    print(f"unknown command: {command_from_frontend}")
    # return response which contains only number of images
    response_to_frontend = _response_to_read_image_details_request(-1, fetch_images.get_number_of_images())
    # serialization will define which fields at response_to_frontend will be at the Json created
    serialized: ResponseToFrontendSerializer = ResponseToFrontendSerializer(response_to_frontend)
    # return response to frontend as json
    return Response(serialized.data, status=status.HTTP_400_BAD_REQUEST)


def _response_to_read_image_details_request(image_index: int, total_number_of_images: int) -> ResponseToFrontend:
    """
    return ResponseToFrontEnd object for request command READ_IMAGE_DETAILS
    :param total_number_of_images:
    :return:
    """
    return ResponseToFrontend(image_index=image_index, image_path="", image_year=2000, image_event="",
                              total_number_of_images=total_number_of_images)




def _response_to_prev_or_next_commands(image_index: int, image_details: ImageDetails,
                                       total_number_of_images: int) -> ResponseToFrontend:
    """
    return ResponseToFrontEnd for a prev/next request commands GET_NEXT_IMAGE_DETAILS, GET_PREV_IMAGE_DETAILS
    :param image_details:
    :return:
    """
    return ResponseToFrontend(image_index=image_index, image_path=image_details.name, image_year=image_details.year,
                              image_event=image_details.event, total_number_of_images=total_number_of_images)
