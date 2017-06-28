// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');
// Instantiates a client
const translateClient = Translate();

// [START functions_pubsub_setup]
const PubSub = require('@google-cloud/pubsub');
// Instantiates a client
const pubsub = PubSub();
const topicStorage = pubsub.topic('text-storage');
const topicTranslation = pubsub.topic('text-translation');
// [END functions_pubsub_setup]


/**
 * Background Cloud Function to be triggered by Pub/Sub.
 *
 * @param {object} event The Cloud Functions event.
 */
exports.detectLanguage = function (event, callback) {
  const pubsubMessage = event.data;
  // note: published text was x, received text is "x" (i.e. quotation marks are added)
  const text = Buffer.from(pubsubMessage.data, 'base64').toString();
  text.slice(1, text.length-1)

  console.log('Received: ' + pubsubMessage.data);
  console.log('Received: ' + text);

  // Detects the language. "text" can be a string for detecting the language of
  // a single piece of text, or an array of strings for detecting the languages
  // of multiple texts.
  translateClient.detect(text)
    .then((results) => {
      let detections = results[0];
	  // we expect only one detection, but to be future proof...
      detections = Array.isArray(detections) ? detections : [detections];
      console.log('Detections:');
      detections.forEach((detection) => {
        console.log(`${detection.input} => ${detection.language}`);
		console.log('Language detection "' +detection.language + '" (reliable = ' + detection.isReliable + ') with confidence ' + detection.confidence + ' (' + detection.input +').');
		if (detection.language == 'en') {
			// send text to storage topic
			console.log('Sending text to "text-storage" topic (' + detection.input + ').');
			topicStorage.publish(detection.input);
		} else {
			// TODO construct message, send to translation topic
			var msg = {
				sourceLang : detection.language,
				targetLang : 'en',
				text : detection.input
			};
			console.log('Sending msg to "text-translation" topic (' + msg + ').');
			topicTranslation.publish(msg);
		}
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
  });
  
  callback();
};