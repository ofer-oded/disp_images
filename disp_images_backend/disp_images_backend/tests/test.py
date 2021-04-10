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
        self.assertEqual(eval(response.content)['image_name'],'1999__eventB/20150904_050628 17.06.46.jpg')

        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],1)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)
        self.assertEqual(eval(response.content)['image_name'],'1999__eventB/20150904_040242 17.06.43.JPG')


        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],2)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)
        self.assertEqual(eval(response.content)['image_name'],'2001__eventA/20150904_040242.jpg')


        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],0)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)
        self.assertEqual(eval(response.content)['image_name'],'1999__eventB/20150904_050628 17.06.46.jpg')
        self.assertEqual(eval(response.content)['year'],"1999")


        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],1)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)
        self.assertEqual(eval(response.content)['image_name'],'1999__eventB/20150904_040242 17.06.43.JPG')


        response = self.client.get('/disp_images/',{'command':'RESTART'})
        self.assertEqual(response.status_code, 200)

        response = self.client.get('/disp_images/',{'command':'GET_NEXT_IMAGE_NAME'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],0)
        self.assertEqual(eval(response.content)['total_number_of_images'],3)
        self.assertEqual(eval(response.content)['image_name'],'1999__eventB/20150904_050628 17.06.46.jpg')


        response = self.client.get('/disp_images/',{'command':'NOT_SUPPORTED_COMMAND'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(eval(response.content)['image_index'],-1)
