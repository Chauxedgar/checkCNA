from rest_framework import serializers
from .models import Estudiante, Docente

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = '__all__' # Esto le dice a Django que traduzca todas las columnas de la tabla

class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = '__all__'