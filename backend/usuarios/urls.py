from django.urls import path
from .views import LoginAPIView

urlpatterns = [
    # Esta ruta se encargará de procesar el inicio de sesión
    path('login/', LoginAPIView.as_view(), name='api_login'),
]