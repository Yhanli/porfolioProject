#!/usr/bin/env bash
sudo git stash
sudo git reset --hard origin/master
sudo git pull
sudo npm install
sudo rm -R myPortfolio/media_root
sudo rm myPortfolio/db.sqlite3
sudo cp -R myPortfolio/media_root_dist/ myPortfolio/media_root/
sudo cp myPortfolio/db.sqlite3_dist myPortfolio/db.sqlite3
sudo chmod -R 777 *
sudo npm run build
pipenv sync
pipenv run python myPortfolio/manage.py makemigrations
pipenv run python myPortfolio/manage.py migrate
pipenv run python myPortfolio/manage.py collectstatic --noinput