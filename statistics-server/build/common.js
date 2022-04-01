const UglifyJS = require('uglify-js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

let fsContent = fs
  .readFileSync(path.resolve(__dirname, '../public/zs.template'))
  .toString();
fsContent = fsContent.replace(/\{\{urlPrefix\}\}/g, config.urlPrefix);

console.log(process.env.NODE_ENV);

const result = UglifyJS.minify(fsContent);
fs.writeFileSync(
  path.resolve(__dirname, '../public/zs.js'),
  result.code,
  (err) => {
    console.log(err);
  },
);
