from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db import models
from .models import Factor, Caracteristica, Indicador, Pregunta, Respuesta, Participacion
from .serializers import FactorSerializer, CaracteristicaSerializer, IndicadorSerializer, PreguntaSerializer
from usuarios.models import Estudiante, Docente, Egresado, Administrativo, Directivo, Empleador
from django.contrib.auth import authenticate

# 1. ViewSets de la estructura del CNA
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

# 2. Vista para el Login de la Encuesta
class ValidarAccesoEncuestaView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        doc = request.data.get('documento')
        pwd = request.data.get('contrasena')

        if not doc or not pwd or str(doc).strip() != str(pwd).strip():
            return Response({'error': 'El usuario y la contraseña no coinciden.'}, status=status.HTTP_401_UNAUTHORIZED)

        estamentos = {
            'Estudiantes': Estudiante,
            'Docentes': Docente,
            'Egresados': Egresado,
            'Administrativos': Administrativo,
            'Directivos': Directivo,
            'Empleadores': Empleador
        }

        for nombre_estamento, modelo in estamentos.items():
            persona = modelo.objects.filter(dni=doc).first()
            if persona:
                return Response({
                    'mensaje': 'Acceso permitido',
                    'estamento': nombre_estamento,
                    'documento': doc
                }, status=status.HTTP_200_OK)

        return Response({'error': 'El documento no se encuentra registrado en el programa.'}, status=status.HTTP_404_NOT_FOUND)

# 3. Vista para entregar y recibir el Cuestionario
class CuestionarioView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, estamento):
        preguntas = Pregunta.objects.filter(
            models.Q(estamento_dirigido=estamento) | models.Q(estamento_dirigido='Todos')
        )
        serializer = PreguntaSerializer(preguntas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        estamento = request.data.get('estamento')
        documento = request.data.get('documento') # Por si luego deseas auditar quién respondió
        respuestas = request.data.get('respuestas', [])

        if not respuestas:
            return Response({'error': 'No se enviaron respuestas'}, status=status.HTTP_400_BAD_REQUEST)

        for item in respuestas:
            Respuesta.objects.create(
                pregunta_id=item['pregunta_id'],
                valoracion=item['valoracion'],
                estamento=estamento
            )
            if documento:
                Participacion.objects.get_or_create(documento=documento, defaults={'estamento': estamento})
                
                return Response({'mensaje': '¡Encuesta guardada con éxito!'}, status=status.HTTP_201_CREATED)
            
            
class GraficaParticipacionView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Mapeamos los 6 estamentos con sus respectivos modelos
        estamentos = {
            'Estudiantes': Estudiante,
            'Docentes': Docente,
            'Egresados': Egresado,
            'Administrativos': Administrativo,
            'Directivos': Directivo,
            'Empleadores': Empleador
        }

        etiquetas = []
        votaron = []
        faltan = []

        # Calculamos las estadísticas dinámicamente para cada grupo
        for nombre, modelo in estamentos.items():
            total = modelo.objects.count()
            participaron = Participacion.objects.filter(estamento=nombre).count()
            faltantes = max(0, total - participaron)

            etiquetas.append(nombre)
            votaron.append(participaron)
            faltan.append(faltantes)

        datos_grafica = {
            'etiquetas': etiquetas,
            'votaron': votaron,
            'faltan': faltan
        }
        
        return Response(datos_grafica, status=status.HTTP_200_OK)
            
class LoginAdminView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Capturamos los datos, sin importar si Angular los envía en inglés o en español
        usuario = request.data.get('username') or request.data.get('usuario')
        contrasena = request.data.get('password') or request.data.get('contrasena')

        # El sistema nativo de Django verifica la contraseña encriptada
        user = authenticate(username=usuario, password=contrasena)

        if user is not None:
            if user.is_staff or user.is_superuser:
                # Si es administrador, le abrimos la puerta y le damos un token de acceso
                return Response({
                    'mensaje': 'Acceso concedido',
                    'token': 'token-admin-autorizado',
                    'usuario': user.username
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No tienes permisos de administrador para entrar al Dashboard.'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'error': 'Credenciales incorrectas.'}, status=status.HTTP_401_UNAUTHORIZED)
    