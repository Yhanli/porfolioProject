from django.db import models


# Create your models here.

class Portfolios(models.Model):
    title = models.CharField(max_length=1000, blank=True)
    description = models.TextField(blank=True)

    project_startdate = models.DateTimeField(blank=True)
    project_enddate = models.DateTimeField(blank=True)

    direct_url = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Portfolio"
        verbose_name_plural = "Portfolios"


class ProjectPictures(models.Model):
    picture = models.ImageField(upload_to="portfolio_content/", blank=True)
    portfolioId = models.ForeignKey(Portfolios, on_delete=models.CASCADE, related_name="project_image")
