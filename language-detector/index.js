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

  callback();
};