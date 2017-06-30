// init datastore client
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();


/**
 * Background Cloud Function to be triggered by Pub/Sub.
 *
 * @param {object} event The Cloud Functions event.
 */
exports.store = function (event, callback) {
  // get event payload
  const pubsubMessage = event.data;
  console.log('event.data: ' + event.data);
  //log('event.data', event.data);
  // decode
  var string = Buffer.from(pubsubMessage.data, 'base64').toString();
  // remove quotation marks
  string = string.slice(1, string.length-1);
  console.log('string: ' + string);
  //log('string', string);
  
  // create datastore key
  var key = datastore.key('Text');
  console.log('key: ' + key);
  //log('key', key);
  // create entity object
  // comprises the key and one property "Text" containing the text to store
  var entity = {
    key: key,
    data: {
      Text: string
    }
  };
  console.log('entity.key: ' + entity.key);
  console.log('entity.data: ' + entity.data);
  //log('entity', entity);
  //log('entity.data', entity.data);
  
  // save entity to datastore
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
	console.log('- ' + key + ' = ' + val);
  });	
}