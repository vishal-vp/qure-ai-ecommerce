## Getting Started

### Setup environment

1. Install pyenv: https://github.com/pyenv/pyenv
2. Install python. `pyenv install 3.9.0`

### Install dependencies

1. Create a virtualenvironment.

```bash
pyenv virtualenv 3.9.0 qure_ai_ecommerce
```

2. Activate the virtualenvironment

```bash
pyenv local qure_ai_ecommerce
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

### Create migrations

```bash
python manage.py migrate
```

### Start development server

```bash
python manage.py runserver
```

### Create Superuser

```bash
python manage.py createsuperuser
```

### Login to the admin portal

1. Go to `http://localhost:8000/admin`
2. Login using the credential you created
