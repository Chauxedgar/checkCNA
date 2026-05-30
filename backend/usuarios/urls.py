from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EstudianteViewSet, DocenteViewSet, EgresadoViewSet, AdministrativoViewSet, DirectivoViewSet, EmpleadorViewSet, DashboardStatsViewSet
# El router crea automáticamente las rutas GET, POST, PUT y DELETE
router = DefaultRouter()
router.register(r'estudiantes', EstudianteViewSet)
router.register(r'docentes', DocenteViewSet)
router.register(r'egresados', EgresadoViewSet)
router.register(r'administrativos', AdministrativoViewSet)
router.register(r'directivos', DirectivoViewSet)
router.register(r'empleadores', EmpleadorViewSet)

urlpatterns = [
    # Ruta manual para el login
    path('dashboard/stats/', DashboardStatsViewSet.as_view(), name='dashboard-stats'), # <-- RUTA NUEVA
    path('', include(router.urls)),
]