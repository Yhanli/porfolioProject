from django.db import models

# Create your models here.



class Experience(models.Model):
    active = models.BooleanField(default=True)
    sort_rank = models.IntegerField(default=100)
    title = models.CharField(max_length=1000, blank=False)
    nature = models.CharField(max_length=1000,blank=True, null=True)
    company = models.CharField(max_length=1000, blank=True)
    location = models.CharField(max_length=1000, blank=True)
    time_start = models.DateField(blank=True)
    time_end = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)