from django.contrib import admin
from .models import Portfolios, ProjectPictures


# Register your models here.
class ProjectPicturesInline(admin.TabularInline):
    model = ProjectPictures
    fields = ['picture']


class PageAdmin(admin.ModelAdmin):
    inlines = [ProjectPicturesInline]


admin.site.register(Portfolios, PageAdmin)
