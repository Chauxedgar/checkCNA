from django.contrib import admin
from .models import Factor, Caracteristica, Indicador, Pregunta, Respuesta

# Register your models here.
from django.contrib import admin
from .models import Factor, Caracteristica, Indicador, Pregunta

admin.site.register(Factor)
admin.site.register(Caracteristica)
admin.site.register(Indicador)
admin.site.register(Pregunta)
admin.site.register(Respuesta)