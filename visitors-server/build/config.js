const developmentConfig = {
  urlPrefix: 'http://127.0.0.1:3000',
};

const productionConfig = {
  urlPrefix: 'http://zuo11.com:3000',
};

const config =
  process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig;

module.exports = config;
