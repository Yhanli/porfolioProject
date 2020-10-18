from django.contrib import admin
from .models import Portfolios, ProjectPictures


# Register your models here.
class ProjectPicturesInline(admin.TabularInline):
    model = ProjectPictures
    fields = ['picture', 'picture_direct', 'picture_alt']


def make_active(modeladmin, request, queryset):
    queryset.update(active=True)


make_active.short_description = "Mark Portfolio as active"


def make_inactive(modeladmin, request, queryset):
    queryset.update(active=False)


make_inactive.short_description = "Mark Portfolio as inactive"


class PageAdmin(admin.ModelAdmin):
    list_display = ['title',
                    'active',
                    'sort_rank',
                    'project_startdate',
                    'project_enddate',
                    'created_at',
                    'updated_at'
                    ]
    inlines = [ProjectPicturesInline]
    actions = [make_active, make_inactive]


admin.site.register(Portfolios, PageAdmin)
