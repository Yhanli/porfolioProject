from .models import *
from rest_framework import viewsets, permissions
from .serializers import PortfoliosSerializer
from rest_framework.response import Response


class PortfoliosViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PortfoliosSerializer
    queryset = Portfolios.objects.all()
    http_method_names = ['get']

    def list(self, request):
        queryset = Portfolios.objects.all()
        queryset = queryset.filter(active=True)
        queryset = queryset.order_by('-sort_rank')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# class PostViewSet(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     filter_backends = [filters.OrderingFilter]
#     ordering_fields = ['created_at']
#     http_method_names = ['get']
#
#     def retrieve(self, request, pk=None):
#         queryset = Post.objects.all()
#         post = get_object_or_404(queryset, pk=pk)
#         serializer = PostSerializer(post)
#         return Response(serializer.data)
#
#     def list(self, request):
#         queryset = Post.objects.all()
#         postType = self.request.query_params.get('post_type')
#         queryset = queryset.filter(active=True)
#         if postType:
#             queryset = queryset.filter(post_type=postType)
#         queryset = queryset.order_by('-created_at')
#         serializer = self.get_serializer(queryset, many=True)
#
#         # for item in serializer.data:
#         #     print(item['id'])
#         return Response(serializer.data)