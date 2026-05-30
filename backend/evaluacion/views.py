from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Factor, Caracteristica, Indicador, Pregunta
from .serializers import FactorSerializer, CaracteristicaSerializer, IndicadorSerializer, PreguntaSerializer

class FactorViewSet(viewsets.ModelViewSet):
    queryset = Factor.objects.all()
    serializer_class = FactorSerializer
    permission_classes = [AllowAny]

class CaracteristicaViewSet(viewsets.ModelViewSet):
    queryset = Caracteristica.objects.all()
    serializer_class = CaracteristicaSerializer
    permission_classes = [AllowAny]

class IndicadorViewSet(viewsets.ModelViewSet):
    queryset = Indicador.objects.all()
    serializer_class = IndicadorSerializer
    permission_classes = [AllowAny]

class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer
    permission_classes = [AllowAny]