from rest_framework import serializers
from .models import Empleador, Estudiante, Docente, Egresado, Administrativo, Directivo

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = '__all__' # Esto le dice a Django que traduzca todas las columnas de la tabla

class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = '__all__'

class EgresadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Egresado
        fields = '__all__'

class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = '__all__'
class AdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrativo
        fields = '__all__'

class DirectivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Directivo
        fields = '__all__'

class EmpleadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleador
        fields = '__all__'