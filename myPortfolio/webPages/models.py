from django.db import models


# Create your models here.


class WebPages(models.Model):
    site_name = models.CharField(max_length=1000, blank=True)
    favicon = models.FileField(upload_to="website_main/")
    facebook = models.CharField(max_length=1000, blank=True)
    instagram = models.CharField(max_length=1000, blank=True)
    twitter = models.CharField(max_length=1000, blank=True)
    youtube = models.CharField(max_length=1000, blank=True)
    linkedin = models.CharField(max_length=1000, blank=True)

    class Meta:
        verbose_name = "Website Page"
        verbose_name_plural = "Website Pages"


class Portfolio(models.Model):
    webPages = models.OneToOneField(WebPages, on_delete=models.CASCADE)

    front_image = models.FileField(upload_to="webpages/portfolio", blank=True)
    page_title = models.CharField(max_length=100, default=None, blank=True, null=True)
    name = models.CharField(max_length=100, default=None, blank=True, null=True)

    description = models.TextField(blank=True)
