from django.contrib import admin
from .models import *
# Register your models here.


class PageAdmin(admin.ModelAdmin):
    list_display = ['title',
                    'active',
                    'sort_rank',
                    'company',
                    'location',
                    'time_start',
                    'time_end'
                    ]

admin.site.register(Experience,PageAdmin)
