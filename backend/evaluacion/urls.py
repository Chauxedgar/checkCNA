from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FactorViewSet, CaracteristicaViewSet, IndicadorViewSet, PreguntaViewSet

router = DefaultRouter()
router.register(r'factores', FactorViewSet)
router.register(r'caracteristicas', CaracteristicaViewSet)
router.register(r'indicadores', IndicadorViewSet)
router.register(r'preguntas', PreguntaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]