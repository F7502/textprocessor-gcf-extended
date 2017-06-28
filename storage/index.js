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

  // TEST 1
  console.log('TEST 1');
  var key = datastore.key('Company');
  console.log('key: ' + key);
  var entity = {
    key: key,
    data: {
      rating: '10'
    }
  };

  // TEST 2
  console.log('TEST 2');
  var key = datastore.key('Company');
  console.log('key: ' + key);
  var entity = {
    key: key,
    data: data
  };

datastore.save(entity, function(err) {
  console.log(key.path); // [ 'Company', 5669468231434240 ]
  console.log(key.namespace); // undefined
});
  
  
  
  
  
  
  var key = datastore.key('Text');
  console.log('key: ' + key);
  var entity = {
    key: key,
    data: data
  };
  console.log('entity.key: ' + entity.key);
  console.log('entity.data: ' + entity.data);
  
  datastore.save(entity, function(err) {
    console.log('key.path: ' + key.path); 
  });

  //datastore.save(entity)
  //  .then(() => consonle.log(`Entity ${key.path} saved.`))
  //  .catch((err) => {
  //    console.error(err);
  //}); 
  
  callback();
};