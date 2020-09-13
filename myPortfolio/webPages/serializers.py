from rest_framework import serializers
from webPages.models import *

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = "__all__"

class WebPagesSerializer(serializers.ModelSerializer):
    portfolio = PortfolioSerializer()
    class Meta:
        model = WebPages
        fields = "__all__"
        extra_fields = ["portfolio"]

