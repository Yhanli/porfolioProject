from rest_framework import routers
from .api import PortfoliosViewSet

router = routers.DefaultRouter()
router.register('api/portfolios', PortfoliosViewSet, 'portfolios')

urlpatterns = router.urls
