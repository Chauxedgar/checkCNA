from django.db import models
from django.contrib.auth.models import User

# El superusuario de Django gestionará las cuentas.
# Aquí definimos las tablas relacionales según tu esquema.

class Superusuario(models.Model):
    # pk = Primary Key, fk = Foreign Key
    dni = models.CharField(max_length=20, primary_key=True)
    id = models.OneToOneField(User, on_delete=models.CASCADE) # fk1 hacia la cuenta de login
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')

class Estudiante(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento de Identidad") # fk1
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')
    semestre = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)

class Docente(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento de Identidad") # fk1
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')

class Administrativo(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento") 
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')
    cargo = models.CharField(max_length=100)

class Directivo(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento") 
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')
    cargo = models.CharField(max_length=100)

class Egresado(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento de Identidad")
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')
    tipo = models.CharField(max_length=50)
    rol = models.CharField(max_length=100)
    empresa = models.CharField(max_length=255, blank=True, null=True) # Nueva columna para la empresa del egresado

class Empleador(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento") 
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    empresa = models.CharField(max_length=255)