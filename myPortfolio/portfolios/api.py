from .models import *
from rest_framework import viewsets, permissions
from .serializers import PortfoliosSerializer


class PortfoliosViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PortfoliosSerializer
    queryset = Portfolios.objects.all()
    http_method_names = ['get']
