from django.contrib import admin
from .models import *


# Register your models here.

class PageAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'name',
        'record_type',
        'reference',
        'status',
        'action',
        'content',
        'created_at',
    ]

admin.site.register(Records, PageAdmin)
