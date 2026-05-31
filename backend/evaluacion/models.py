from django.db import models

# Create your models here.
from django.db import models

class Factor(models.Model):
    id = models.AutoField(primary_key=True)
    numero = models.IntegerField(unique=True, verbose_name="Número del Factor")
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Factor {self.numero}: {self.nombre}"

class Caracteristica(models.Model):
    id = models.AutoField(primary_key=True)
    factor = models.ForeignKey(Factor, on_delete=models.CASCADE, related_name='caracteristicas')
    numero = models.IntegerField(verbose_name="Número de la Característica")
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Característica {self.numero} - {self.nombre}"

class Indicador(models.Model):
    id = models.AutoField(primary_key=True)
    caracteristica = models.ForeignKey(Caracteristica, on_delete=models.CASCADE, related_name='indicadores')
    numero = models.CharField(max_length=10, verbose_name="Número del Indicador (Ej: 1.1)")
    descripcion = models.TextField()

    def __str__(self):
        return f"Indicador {self.numero}"

class Pregunta(models.Model):
    # Opciones para saber a quién le mostramos esta pregunta en su encuesta
    ESTAMENTOS_CHOICES = [
        ('Estudiantes', 'Estudiantes'),
        ('Docentes', 'Docentes'),
        ('Egresados', 'Egresados'),
        ('Administrativos', 'Administrativos'),
        ('Directivos', 'Directivos'),
        ('Empleadores', 'Empleadores'),
        ('Todos', 'Todos'),
    ]

    id = models.AutoField(primary_key=True)
    indicador = models.ForeignKey(Indicador, on_delete=models.CASCADE, related_name='preguntas')
    enunciado = models.TextField(verbose_name="Enunciado de la Pregunta")
    estamento_dirigido = models.CharField(max_length=50, choices=ESTAMENTOS_CHOICES)

    def __str__(self):
        return self.enunciado
class Respuesta(models.Model):
    ESCALA_LIKERT = [
        (5, 'Totalmente de acuerdo'),
        (4, 'De acuerdo'),
        (3, 'Ni de acuerdo ni en desacuerdo'),
        (2, 'En desacuerdo'),
        (1, 'Totalmente en desacuerdo'),
        (0, 'No Sabe / No Aplica'), # Muy importante en encuestas institucionales
    ]

    id = models.AutoField(primary_key=True)
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE, related_name='respuestas')
    valoracion = models.IntegerField(choices=ESCALA_LIKERT, verbose_name="Valoración Likert")
    
    # Guardamos qué estamento respondió para poder segmentar las gráficas después
    estamento = models.CharField(max_length=50) 
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.estamento}] {self.pregunta.enunciado[:30]}... -> {self.get_valoracion_display()}"
class Participacion(models.Model):
    id = models.AutoField(primary_key=True)
    documento = models.CharField(max_length=50, unique=True, verbose_name="DNI del Votante")
    estamento = models.CharField(max_length=50)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.estamento} - {self.documento} (Completada)"