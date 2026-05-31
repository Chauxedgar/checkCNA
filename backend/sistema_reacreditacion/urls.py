from django.contrib import admin
from django.urls import path, include
from evaluacion.views import LoginAdminView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('usuarios.urls')),
    path('api/evaluacion/', include('evaluacion.urls')), 
    path('api/login/', LoginAdminView.as_view(), name='api-login'),
]