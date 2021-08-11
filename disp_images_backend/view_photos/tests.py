from django.test import TestCase
from view_photos.views import RequestCommands as RequestCommands


class TestCalls(TestCase):

    def test_index(self):
        response = self.client.get('/view_photos/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'view_photos_app')

    def test_get_image_name(self):
        end_point = '/view_photos/get_image_details/'
        response = self.client.get(end_point, {'command': 'UNKOWN_COMMAND'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(eval(response.content)['image_index'], -1)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)

        response = self.client.get(end_point, {'command': RequestCommands.GET_PREV_IMAGE_DETAILS})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'], 4)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)
        self.assertEqual(eval(response.content)['image_path'], '2001__eventA/20150905_054750.jpg')

        response = self.client.get(end_point, {'command': RequestCommands.GET_NEXT_IMAGE_DETAILS})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'], 0)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)
        self.assertEqual(eval(response.content)['image_path'], '1999__eventB/20150903_224212.jpg')

        response = self.client.get(end_point, {'command': RequestCommands.GET_NEXT_IMAGE_DETAILS})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'], 1)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)
        self.assertEqual(eval(response.content)['image_path'], '1999__eventB/20150904_044359.jpg')

        response = self.client.get(end_point, {'command': RequestCommands.GET_NEXT_IMAGE_DETAILS})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'], 2)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)
        self.assertEqual(eval(response.content)['image_path'], '1999__eventB/20150904_050923.jpg')

        response = self.client.get(end_point, {'command': RequestCommands.GET_NEXT_IMAGE_DETAILS})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'], 3)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)
        self.assertEqual(eval(response.content)['image_path'], '2001__eventA/20150904_040242.jpg')

        response = self.client.get(end_point, {'command': RequestCommands.GET_NEXT_IMAGE_DETAILS})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'], 4)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)
        self.assertEqual(eval(response.content)['image_path'], '2001__eventA/20150905_054750.jpg')

        response = self.client.get(end_point, {'command': RequestCommands.GET_NEXT_IMAGE_DETAILS})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'], 0)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)
        self.assertEqual(eval(response.content)['image_path'], '1999__eventB/20150903_224212.jpg')

        response = self.client.get(end_point, {'command': RequestCommands.GET_NEXT_IMAGE_DETAILS})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'], 1)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)
        self.assertEqual(eval(response.content)['image_path'], '1999__eventB/20150904_044359.jpg')

        response = self.client.get(end_point, {'command': RequestCommands.READ_IMAGE_DETAILS})
        self.assertEqual(response.status_code, 200)

        response = self.client.get(end_point, {'command': 'RESTART'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(eval(response.content)['total_number_of_images'], 5)
