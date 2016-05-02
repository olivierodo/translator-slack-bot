var google = require('googleapis'),
  Promise = require("bluebird"),
  config = require('config'),
  translate = google.translate('v2');

var o = function(options) {
  return new Promise(function(resolve, reject) {
    options.key = options.key || process.env.G_TRANSLATE_KEY || config.google.key;

    if (!options.key) return reject('need google key');
    if (!options.q) return reject('need query');
    if (!options.target) return reject('need target');

    translate.translations.list(options, function(err, response) {
      if (err) reject(err);
      console.log(response);
      var result = response.data.translations;
      resolve(result[0].translatedText);
    });
  });
};

module.exports = o;
