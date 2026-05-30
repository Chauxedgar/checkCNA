from rest_framework import serializers
from .models import Factor, Caracteristica, Indicador, Pregunta

class FactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factor
        fields = '__all__'

class CaracteristicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caracteristica
        fields = '__all__'

class IndicadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicador
        fields = '__all__'

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = '__all__'