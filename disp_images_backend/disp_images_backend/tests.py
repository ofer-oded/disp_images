from django.test import TestCase


class TestCalls(TestCase):
    def test_index(self):
        response = self.client.get('')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content,b'disp_images_site')

