from .models import *
from rest_framework import viewsets, permissions
from .serializers import WebPagesSerializer
from rest_framework import filters
from rest_framework.response import Response


class WebPagesViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WebPagesSerializer
    http_method_names = ['get']

    def list(self, request):
        queryset = WebPages.objects.all()
        serializer = WebPagesSerializer(many=True)
        if len(serializer.data) > 0:
            return Response(serializer.data[0])
        else:
            serializer = WebPagesSerializer(queryset, many=True)
            return Response(serializer.data[0])
