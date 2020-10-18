from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.

class Portfolios(models.Model):
    active = models.BooleanField(default=False)
    title = models.CharField(max_length=1000, blank=True)
    sort_rank = models.IntegerField(default=100)

    project_startdate = models.DateTimeField(blank=True)
    project_enddate = models.DateTimeField(blank=True)

    direct_url = models.URLField(blank=True, null=True)
    source_code_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    project_hours = models.IntegerField(blank=True)
    description = models.TextField(blank=True)
    styled_description = RichTextField(blank=True, null=True)

    class Meta:
        verbose_name = "Portfolio"
        verbose_name_plural = "Portfolios"


class ProjectPictures(models.Model):
    picture = models.ImageField(upload_to="portfolio_content/", blank=True)
    picture_direct = models.URLField(blank=True, null=True)
    picture_alt = models.CharField(max_length=250, blank=True, null=True)
    portfolioId = models.ForeignKey(Portfolios, on_delete=models.CASCADE, related_name="project_image")
