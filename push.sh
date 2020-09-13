sudo rm -R myPortfolio/media_root_dist
sudo cp -R myPortfolio/media_root/ media_root_dist
sudo cp myPortfolio/db.sqlite3 myPortfolio/db.sqlite3_dist
sudo git add .
sudo git commit
sudo git push
