from django.contrib import admin
from .models import Portfolios, ProjectPictures


# Register your models here.
class ProjectPicturesInline(admin.TabularInline):
    model = ProjectPictures
    fields = ['picture']


class PageAdmin(admin.ModelAdmin):
    list_display = ['title',
                    'project_startdate',
                    'project_enddate',
                    'created_at',
                    'updated_at'
                    ]
    inlines = [ProjectPicturesInline]


admin.site.register(Portfolios, PageAdmin)
