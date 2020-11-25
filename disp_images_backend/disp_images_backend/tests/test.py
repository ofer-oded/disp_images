from django.test import TestCase
class TestCalls(TestCase):
    def test_index(self):
        response = self.client.get('/index/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content,b'hello')

    def test_get_image_name(self):
        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],0)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)

        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],1)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)

        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],2)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)

        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],0)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)

        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],1)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)

        response = self.client.get('/disp_images/',{'command':'RESTART'})
        self.assertEqual(response.status_code, 200)

        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],0)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)

        response = self.client.get('/disp_images/',{'command':'NOT_SUPPORTED_COMMAND'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],-1)
