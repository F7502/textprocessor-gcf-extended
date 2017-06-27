const Datastore = require('@google-cloud/datastore');

// Instantiates a client
const datastore = Datastore();


/**
 * Background Cloud Function to be triggered by Pub/Sub.
 *
 * @param {object} event The Cloud Functions event.
 */
exports.store = function (event, callback) {
  const pubsubMessage = event.data;
  console.log('event.data: ' + event.data);
  // note: published text was x, received text is "x" (i.e. quotation marks are added)
  const string = Buffer.from(pubsubMessage.data, 'base64').toString();
  console.log('string: ' + string);
  const data = JSON.parse(string);
  console.log('data: ' + data);

  var key = datastore.key('Text');
  var entity = {
    key: key,
    data: data
  };
  
  datastore.save(entity)
    .then(() => consonle.log(`Entity ${key.path} saved.`))
    .catch((err) => {
      console.error(err);
  }); 
  
  callback();
};