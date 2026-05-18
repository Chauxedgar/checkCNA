from django.contrib import admin
from .models import Superusuario, Estudiante, Docente, Administrativo, Directivo, Egresado, Empleador

# Registramos cada tabla para que el Superusuario pueda gestionarlas
admin.site.register(Superusuario)
admin.site.register(Estudiante)
admin.site.register(Docente)
admin.site.register(Administrativo)
admin.site.register(Directivo)
admin.site.register(Egresado)
admin.site.register(Empleador)