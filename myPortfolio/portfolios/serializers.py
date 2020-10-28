from rest_framework import serializers
from portfolios.models import *


class ProjectImagesSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(read_only=True)

    class Meta:
        model = ProjectPictures
        fields = "__all__"


class PortfoliosSerializer(serializers.ModelSerializer):
    project_image = ProjectImagesSerializer(many=True)
    class Meta:
        model = Portfolios
        fields = "__all__"
        extra_fields = ["project_image"]
