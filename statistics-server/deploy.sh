git pull;
npm run build;
pm2 delete zuo-statistics;
# 注意打包路径，如果非 src 下有 ts 文件，nest 会改变打包方式
pm2 start dist/main.js -n zuo-statistics;
