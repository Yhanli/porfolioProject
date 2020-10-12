#!/usr/bin/env bash
pipenv run python myPortfolio/manage.py makemigrations
pipenv run python myPortfolio/manage.py migrate
pipenv run python myPortfolio/manage.py collectstatic --noinput