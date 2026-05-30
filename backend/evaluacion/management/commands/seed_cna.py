from django.core.management.base import BaseCommand
from evaluacion.models import Factor, Caracteristica, Indicador

class Command(BaseCommand):
    help = 'Puebla la base de datos con los lineamientos estructurales base del CNA'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Iniciando el sembrado de datos del CNA...'))

        # 1. Definición de la estructura de datos institucional
        estructura_cna = [
            {
                'numero': 1,
                'nombre': 'Proyecto Institucional y Programa Académico',
                'descripcion': 'Evaluación de la coherencia del programa con la misión institucional.',
                'caracteristicas': [
                    {
                        'numero': 1,
                        'nombre': 'Pertinencia e Impacto del Programa',
                        'descripcion': 'Análisis del impacto social y pertinencia regional.',
                        'indicadores': [
                            {'numero': '1.1', 'descripcion': 'Correspondencia con las necesidades de desarrollo acuícola de la región y del país.'},
                            {'numero': '1.2', 'descripcion': 'Impacto y posicionamiento de los graduados en el entorno productivo.'}
                        ]
                    },
                    {
                        'numero': 2,
                        'nombre': 'Proyecto Educativo del Programa',
                        'descripcion': 'Apropiación del PEP por parte de la comunidad.',
                        'indicadores': [
                            {'numero': '2.1', 'descripcion': 'Mecanismos de socialización, seguimiento y actualización del PEP.'}
                        ]
                    }
                ]
            },
            {
                'numero': 2,
                'nombre': 'Estudiantes',
                'descripcion': 'Políticas, estímulos y acompañamiento a la población estudiantil.',
                'caracteristicas': [
                    {
                        'numero': 3,
                        'nombre': 'Mecanismos de Ingreso y Selección',
                        'descripcion': 'Procesos de admisión transparentes.',
                        'indicadores': [
                            {'numero': '3.1', 'descripcion': 'Aplicación de criterios equitativos y transparentes para la selección de aspirantes.'}
                        ]
                    },
                    {
                        'numero': 4,
                        'nombre': 'Permanencia y Graduación',
                        'descripcion': 'Estrategias contra la deserción académica.',
                        'indicadores': [
                            {'numero': '4.1', 'descripcion': 'Efectividad de los programas de tutorías, bienestar y apoyo socioeconómico.'}
                        ]
                    }
                ]
            },
            {
                'numero': 3,
                'nombre': 'Profesores',
                'descripcion': 'Calidad, desarrollo y producción del cuerpo docente.',
                'caracteristicas': [
                    {
                        'numero': 5,
                        'nombre': 'Permanencia, Desarrollo y Capacitación',
                        'descripcion': 'Apoyo a la formación avanzada.',
                        'indicadores': [
                            {'numero': '5.1', 'descripcion': 'Políticas institucionales para el fomento de la formación doctoral y de maestría.'}
                        ]
                    },
                    {
                        'numero': 6,
                        'nombre': 'Producción Académica e Investigación',
                        'descripcion': 'Aportes al conocimiento del sector.',
                        'indicadores': [
                            {'numero': '6.1', 'descripcion': 'Visibilidad e impacto de las publicaciones científicas y proyectos de investigación del programa.'}
                        ]
                    }
                ]
            }
        ]

        # 2. Procesamiento e inserción relacional segura en la base de datos
        for f_data in estructura_cna:
            factor, created = Factor.objects.get_or_create(
                numero=f_data['numero'],
                defaults={'nombre': f_data['nombre'], 'descripcion': f_data['descripcion']}
            )
            if created:
                self.stdout.write(f'Factor {factor.numero} creado.')

            for c_data in f_data['caracteristicas']:
                caracteristica, c_created = Caracteristica.objects.get_or_create(
                    factor=factor,
                    numero=c_data['numero'],
                    defaults={'nombre': c_data['nombre'], 'descripcion': c_data['descripcion']}
                )
                if c_created:
                    self.stdout.write(f'  -> Característica {caracteristica.numero} creada.')

                for i_data in c_data['indicadores']:
                    indicador, i_created = Indicador.objects.get_or_create(
                        caracteristica=caracteristica,
                        numero=i_data['numero'],
                        defaults={'descripcion': i_data['descripcion']}
                    )
                    if i_created:
                        self.stdout.write(f'    * Indicador {indicador.numero} guardado.')

        self.stdout.write(self.style.SUCCESS('¡Sembrado de datos del CNA finalizado con éxito!'))