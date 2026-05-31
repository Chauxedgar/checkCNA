from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# El superusuario de Django gestionará las cuentas.
# Aquí definimos las tablas relacionales según tu esquema.
def validar_dni_global(instancia):
    """Revisa todas las tablas buscando si el DNI ya existe en otro estamento."""
    from .models import Estudiante, Docente, Egresado, Administrativo, Directivo, Empleador
    modelos = [Estudiante, Docente, Egresado, Administrativo, Directivo, Empleador]
    
    for modelo in modelos:
        query = modelo.objects.filter(dni=instancia.dni)
        
        # Si estamos editando un usuario existente, no nos contamos a nosotros mismos
        if isinstance(instancia, modelo) and instancia.pk:
            query = query.exclude(pk=instancia.pk)
            
        if query.exists():
            raise ValidationError({
                'dni': f'Error de seguridad: El DNI {instancia.dni} ya está registrado en el sistema como {modelo.__name__}.'
            })

class Superusuario(models.Model):
    # pk = Primary Key, fk = Foreign Key
    dni = models.CharField(max_length=20, primary_key=True)
    id = models.OneToOneField(User, on_delete=models.CASCADE) # fk1 hacia la cuenta de login
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')
    def clean(self):
        super().clean()
        validar_dni_global(self)
    

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
    def clean(self):
        super().clean()
        validar_dni_global(self)
    def save(self, *args, **kwargs):
        # ¡Esta es la línea mágica! Obliga a Django a revisar antes de guardar
        self.clean() 
        super().save(*args, **kwargs)

class Docente(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento de Identidad") # fk1
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')
    def clean(self):
        super().clean()
        validar_dni_global(self)
    def save(self, *args, **kwargs):
        # ¡Esta es la línea mágica! Obliga a Django a revisar antes de guardar
        self.clean() 
        super().save(*args, **kwargs)
        
class Administrativo(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento") 
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')
    cargo = models.CharField(max_length=100)
    def clean(self):
        super().clean()
        validar_dni_global(self)
    def save(self, *args, **kwargs):
        # ¡Esta es la línea mágica! Obliga a Django a revisar antes de guardar
        self.clean() 
        super().save(*args, **kwargs)

class Directivo(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento") 
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    universidad = models.CharField(max_length=255, default='Universidad de Nariño')
    programa = models.CharField(max_length=255, default='Ingeniería en Producción Acuícola')
    cargo = models.CharField(max_length=100)
    def clean(self):
        super().clean()
        validar_dni_global(self)
    def save(self, *args, **kwargs):
        # ¡Esta es la línea mágica! Obliga a Django a revisar antes de guardar
        self.clean() 
        super().save(*args, **kwargs)

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
    def clean(self):
        super().clean()
        validar_dni_global(self)
    def save(self, *args, **kwargs):
        # ¡Esta es la línea mágica! Obliga a Django a revisar antes de guardar
        self.clean() 
        super().save(*args, **kwargs)

class Empleador(models.Model):
    id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, unique=True, verbose_name="Documento") 
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=10)
    correo = models.CharField(max_length=255)
    empresa = models.CharField(max_length=255)
    def clean(self):
        super().clean()
        validar_dni_global(self)
    def save(self, *args, **kwargs):
        # ¡Esta es la línea mágica! Obliga a Django a revisar antes de guardar
        self.clean() 
        super().save(*args, **kwargs)
