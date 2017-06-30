// init Translate client
const Translate = require('@google-cloud/translate');
const translateClient = Translate();

// init pub-sub client
const PubSub = require('@google-cloud/pubsub');
const pubsub = PubSub();
const topicStorage = pubsub.topic('text-storage');


/**
 * Background Cloud Function to be triggered by Pub/Sub.
 *
 * @param {object} event The Cloud Functions event.
 */
exports.translate = function (event, callback) {
  // get event payload
  const pubsubMessage = event.data;
  console.log('event.data: ' + event.data);
  // decode (is always base64)
  const string = Buffer.from(pubsubMessage.data, 'base64').toString();
  console.log('string: ' + string);
  // parse to json object
  const data = JSON.parse(string);
  console.log('data: ' + data);

  // create options to be sent to Translate API
  var options = {
    from: data.sourceLang,
    to: data.targetLang
  };
  // translate text
  translateClient.translate(data.text, options)
    .then((results) => {
		const translation = results[0];
		console.log(`Text: ${data.text}`);
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