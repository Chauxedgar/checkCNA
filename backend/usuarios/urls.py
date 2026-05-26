from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginAPIView, EstudianteViewSet, DocenteViewSet

# El router crea automáticamente las rutas GET, POST, PUT y DELETE
router = DefaultRouter()
router.register(r'estudiantes', EstudianteViewSet)
router.register(r'docentes', DocenteViewSet)

urlpatterns = [
    # Ruta manual para el login
    path('login/', LoginAPIView.as_view(), name='api_login'),
    
    # Rutas automáticas para las tablas
    path('', include(router.urls)),
]