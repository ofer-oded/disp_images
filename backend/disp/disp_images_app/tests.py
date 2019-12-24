from django.test import TestCase
from django.test import Client
from django.urls import reverse
from django.http import JsonResponse

class ViewTests(TestCase):
    def test_index(self):
        client  = Client()
        response = client.get(reverse('index'))
        #response = client.get('/index/')
        self.assertEqual(response.status_code,200)

    def test_disp_images(self):
        client = Client()
        response = JsonResponse({})
        response = client.get(reverse('grap-image-url'))
        content = response.content.decode('UTF8')
        self.assertEqual(response.status_code,200)
        self.assertEqual(content,'{"id": "http://127.0.0.1/IMG_0082.JPG"}')

