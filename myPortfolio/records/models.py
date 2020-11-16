from django.db import models

# Create your models here.

class Records(models.Model):
    name = models.CharField(max_length=1000, blank=True)
    record_type = models.CharField(max_length=1000, blank=True)
    reference = models.CharField(max_length=1000, blank=True)
    status = models.CharField(max_length=1000, blank=True)
    action = models.CharField(max_length=1000, blank=True)
    content = models.TextField(blank=True)


    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Record"
        verbose_name_plural = "Records"
