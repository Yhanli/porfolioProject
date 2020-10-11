from django.contrib import admin
from .models import *
import nested_admin


# Register your models here.

admin.site.site_header = "Admin"
admin.site.site_title = "Admin Portal"
admin.site.index_title = "Welcome to My Portfolio"

class PortfolioInline(nested_admin.NestedStackedInline):
    model = Portfolio
    # classes = ["collapse"]

class ExperienceInline(nested_admin.NestedStackedInline):
    model = Experiences
    # classes = ["collapse"]

class PageAdmin(nested_admin.NestedModelAdmin):
    inlines = [PortfolioInline, ExperienceInline]


admin.site.register(WebPages, PageAdmin)
