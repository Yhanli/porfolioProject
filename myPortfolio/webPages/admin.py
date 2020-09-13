from django.contrib import admin
from .models import *
import nested_admin


# Register your models here.

class PortfolioInline(nested_admin.NestedStackedInline):
    model = Portfolio
    classes = ["collapse"]


class PageAdmin(nested_admin.NestedModelAdmin):
    inlines = [PortfolioInline]


admin.site.register(WebPages, PageAdmin)
