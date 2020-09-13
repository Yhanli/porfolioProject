from rest_framework import routers
from .api import WebPagesViewSet

router = routers.DefaultRouter()
router.register('api/webpages', WebPagesViewSet, 'webpages')

urlpatterns = router.urls
