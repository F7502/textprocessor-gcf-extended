// [START functions_pubsub_setup]
const PubSub = require('@google-cloud/pubsub');
// Instantiates a client
const pubsub = PubSub();
const topic = pubsub.topic('language-detection');
// [END functions_pubsub_setup]

/**
 * Simple Text Processor as HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.processText = function processText (req, res) {
  console.log('publish to language-detection: ' + req.body);
  topic.publish(req.body);

  console.log('processing: ' + req.body);
  res.send('[processed by gcf] - ' + req.body);
};