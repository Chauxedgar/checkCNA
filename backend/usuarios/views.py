from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status, viewsets # Añadimos viewsets aquí
from django.contrib.auth import authenticate
from .models import Estudiante, Docente, Egresado, Administrativo, Directivo, Empleador
from .serializers import EstudianteSerializer, DocenteSerializer, EgresadoSerializer, AdministrativoSerializer, DirectivoSerializer, EmpleadorSerializer

class LoginAPIView(APIView):
    # Usamos el método POST porque estamos enviando datos sensibles (contraseñas)
    def post(self, request):
        # 1. Capturamos los datos que nos enviará Angular
        usuario = request.data.get('username')
        contrasena = request.data.get('password')

        # 2. Le pedimos a Django que verifique si ese usuario y contraseña son correctos
        user = authenticate(username=usuario, password=contrasena)

        # 3. Respondemos según el resultado
        if user is not None:
            # Si el usuario existe y la contraseña es correcta:
            return Response({
                "mensaje": "Inicio de sesión exitoso",
                "usuario": user.username,
            }, status=status.HTTP_200_OK)
        else:
            # Si se equivocaron de contraseña o el usuario no existe:
            return Response({
                "error": "Credenciales inválidas. Por favor verifique."
            }, status=status.HTTP_401_UNAUTHORIZED)
class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

class DocenteViewSet(viewsets.ModelViewSet):
    queryset = Docente.objects.all()
    serializer_class = DocenteSerializer

class EgresadoViewSet(viewsets.ModelViewSet):
    queryset = Egresado.objects.all()
    serializer_class = EgresadoSerializer

class AdministrativoViewSet(viewsets.ModelViewSet):
    queryset = Administrativo.objects.all()
    serializer_class = AdministrativoSerializer

class DirectivoViewSet(viewsets.ModelViewSet):
    queryset = Directivo.objects.all()
    serializer_class = DirectivoSerializer

class EmpleadorViewSet(viewsets.ModelViewSet):
    queryset = Empleador.objects.all()
    serializer_class = EmpleadorSerializer
class DashboardStatsViewSet(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        data = {
            'estudiantes': Estudiante.objects.count(),
            'docentes': Docente.objects.count(),
            'egresados': Egresado.objects.count(),
            'administrativos': Administrativo.objects.count(),
            'directivos': Directivo.objects.count(),
            'empleadores': Empleador.objects.count(),
        }
        return Response(data)