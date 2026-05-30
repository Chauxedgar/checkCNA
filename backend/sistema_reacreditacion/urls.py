from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Ruta para el panel de administrador que ya usamos
    path('admin/', admin.site.urls),
    
    # Aquí conectamos todas las rutas de nuestra aplicación "usuarios"
    # El prefijo será 'api/', por lo que la ruta final será 'api/login/'
    path('api/', include('usuarios.urls')),
    path('api/evaluacion/', include('evaluacion.urls')),
]