web: gunicorn --pythonpath project project.wsgi:application --log-file - --log-level debug
python manage.py collectstatic --noinput
manage.py migrate
