from rest_framework import routers
from .api import ExperienceViewSet

router = routers.DefaultRouter()
router.register('api/experience', ExperienceViewSet, 'experience')

urlpatterns = router.urls
