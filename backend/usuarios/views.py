from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

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