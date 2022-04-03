git pull;
npm run build;
pm2 delete zuo-statistics;
pm2 start dist/src/main.js -n zuo-statistics;
