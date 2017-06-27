/**
 * Background Cloud Function to be triggered by Pub/Sub.
 *
 * @param {object} event The Cloud Functions event.
 */
exports.detectLanguage = function (event) {
  const pubsubMessage = event.data;
  const name = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : 'World';

  console.log('Received: ' + pubsubMessage.data);

  return;
};