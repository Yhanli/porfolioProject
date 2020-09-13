#!/usr/bin/env bash
sudo git stash
sudo git reset --hard origin/master
sudo git pull
sudo chmod -R 777 *
sudo npm run build
pipenv run python myPortfolio/manage.py makemigrations
pipenv run python myPortfolio/manage.py migrate
pipenv run python myPortfolio/manage.py collectstatic

sudo supervisorctl stop gunicornPers
sudo supervisorctl start gunicornPers

