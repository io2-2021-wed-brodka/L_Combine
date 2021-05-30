const config = require('./protractor.conf').config;
config.capabilities = {
  browserName: 'chrome',
  acceptInsecureCerts: true,
  acceptSslCerts: true,
  chromeOptions: {
    args: ['--headless', '--no-sandbox', '--allow-insecure-localhost']
  }
};
exports.config = config;
