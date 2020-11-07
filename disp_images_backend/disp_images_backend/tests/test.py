from django.test import TestCase
class TestCalls(TestCase):
    def test_index(self):
        response = self.client.get('/index/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content,b'hello')

    def test_get_image_name(self):
        response = self.client.get('/load/')
        self.assertEqual(response.status_code,200)
        response = self.client.get('/disp_images/',{'IMAGE_INDEX':2})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/disp_images/',{'IMAGE_INDEX':2})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/disp_images/',{'IMAGE_INDEX':2})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/disp_images/',{'IMAGE_INDEX':2})
        self.assertEqual(response.status_code, 200)