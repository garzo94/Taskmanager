from .base import *
import django_on_heroku
import environ
import os
import dj_database_url

env = environ.Env()
environ.Env.read_env()

from .base import *

SECRET_KEY = env('SECRET_KEY')

DEBUG = True
ALLOWED_HOSTS = ['taskmanagerv13294.herokuapp.com']

DEBUG_PROPAGATE_EXCEPTIONS = True
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt' : "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
      
        },
    },
    'loggers': {
        
        'MYAPP': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    }
}

#heroku settings
django_on_heroku.settings(locals(), staticfiles=False)
del DATABASES['default']['OPTIONS']['sslmode']

