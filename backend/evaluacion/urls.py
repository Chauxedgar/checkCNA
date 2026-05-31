from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FactorViewSet, CaracteristicaViewSet, IndicadorViewSet, PreguntaViewSet, ValidarAccesoEncuestaView, CuestionarioView, GraficaParticipacionView

router = DefaultRouter()
router.register(r'factores', FactorViewSet)
router.register(r'caracteristicas', CaracteristicaViewSet)
router.register(r'indicadores', IndicadorViewSet)
router.register(r'preguntas', PreguntaViewSet)

urlpatterns = [
    # Rutas manuales DEBEN ir antes del router
    path('validar-acceso/', ValidarAccesoEncuestaView.as_view(), name='validar-acceso'),
    
    # Nuestras dos nuevas rutas para el cuestionario
    path('cuestionario/', CuestionarioView.as_view(), name='guardar-cuestionario'), 
    path('cuestionario/<str:estamento>/', CuestionarioView.as_view(), name='obtener-cuestionario'), 
    path('grafica-participacion/', GraficaParticipacionView.as_view(), name='grafica-participacion/'),

    # Rutas automáticas
    path('', include(router.urls)),
]