from rest_framework import serializers
from webPages.models import *

class ExperiencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiences
        fields = "__all__"

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = "__all__"

class WebPagesSerializer(serializers.ModelSerializer):
    portfolio = PortfolioSerializer()
    experiences = ExperiencesSerializer(many=True)
    front_image_thumb = serializers.ImageField(read_only=True)
    class Meta:
        model = WebPages
        fields = "__all__"
        extra_fields = ["portfolio", "experiences"]

