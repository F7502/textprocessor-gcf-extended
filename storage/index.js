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
  log('event.data', event.data);
  // note: published text was x, received text is "x" (i.e. quotation marks are added)
  const string = Buffer.from(pubsubMessage.data, 'base64').toString();
  console.log('string: ' + string);
  
  var key = datastore.key('Text');
  console.log('key: ' + key);
  log('key', key);
  var entity = {
    key: key,
    data: string
  };
  console.log('entity.key: ' + entity.key);
  console.log('entity.data: ' + entity.data);
  
  datastore.save(entity, function(err) {
    console.log('key.path: ' + key.path); 
  });

  callback();
};


function log(name, obj) {
  console.log('log obj ' + name + '(' + obj + ')');
  Object.keys(obj).forEach(function (key) {
    var val = obj[key];
    // use val
	console.log('  ' + key + ' = ' + val);
  });	
}s