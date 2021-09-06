from django.db import models

class RequestGotFromFrontEnd(models.Model):
    command = models.CharField(max_length=100)

    # managed = False will allow to use the model without a db
    class Meta:
        managed = False

class ResponseToFrontend(models.Model):
    image_index = models.IntegerField()
    models.CharField()
    image_path = models.CharField(max_length=100, blank=True )
    image_year = models.IntegerField()
    image_event = models.CharField(max_length=100, blank=True)
    total_number_of_images = models.IntegerField()


    # managed = False will allow to use the model without a db
    class Meta:
        managed = False
