// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');
// Instantiates a client
const translateClient = Translate();


/**
 * Background Cloud Function to be triggered by Pub/Sub.
 *
 * @param {object} event The Cloud Functions event.
 */
exports.detectLanguage = function (event, callback) {
  const pubsubMessage = event.data;
  const text = Buffer.from(pubsubMessage.data, 'base64').toString();

  console.log('Received: ' + pubsubMessage.data);
  console.log('Received: ' + text);

  // Detects the language. "text" can be a string for detecting the language of
  // a single piece of text, or an array of strings for detecting the languages
  // of multiple texts.
  translate.detect(text)
    .then((results) => {
      let detections = results[0];
      detections = Array.isArray(detections) ? detections : [detections];
      console.log('Detections:');
      detections.forEach((detection) => {
        console.log(`${detection.input} => ${detection.language}`);
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
  });
  
  callback();
};