nest build;
pm2 delete zuo-statistics;
pm2 start dist/main.js -n zuo-statistics;
