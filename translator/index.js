// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');
// Instantiates a client
const translateClient = Translate();

// [START functions_pubsub_setup]
const PubSub = require('@google-cloud/pubsub');
// Instantiates a client
const pubsub = PubSub();
const topicStorage = pubsub.topic('text-storage');
// [END functions_pubsub_setup]


/**
 * Background Cloud Function to be triggered by Pub/Sub.
 *
 * @param {object} event The Cloud Functions event.
 */
exports.translate = function (event, callback) {
  const pubsubMessage = event.data;
  console.log('event.data: ' + event.data)
  // note: published text was x, received text is "x" (i.e. quotation marks are added)
  const string = Buffer.from(pubsubMessage.data, 'base64').toString();
  console.log('string: ' + string);
  const data = JSON.parse(string);
  console.log('data: ' + data);

  var options = {
    from: data.sourceLang,
    to: data.targetLang
  };
  translateClient.translate(data.text, options)
    .then((results) => {
		const translation = results[0];
		console.log(`Text: ${text}`);
		console.log(`Translation: ${translation}`);
		// send text to storage topic
		console.log('Sending text to "text-storage" topic (' + translation + ').');
		topicStorage.publish(translation);
    })
    .catch((err) => {
      console.error('ERROR:', err);
  });
  
  callback();
};