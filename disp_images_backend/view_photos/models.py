from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


class RequestGotFromFrontEnd(models.Model):
    command = models.CharField(max_length=100)

    # managed = False will allow to use the model without a db
    class Meta:
        managed = False

class ResponseToFrontend(models.Model):
    image_index = models.IntegerField()
    image_path = models.CharField(max_length=100)
    image_year = models.IntegerField()
    image_event = models.CharField(max_length=100)

    # managed = False will allow to use the model without a db
    class Meta:
        managed = False
