const Datastore = require('nedb');
const streamings = new Datastore({ filename: 'streamings.db', timestampData: true, autoload: true }); 


streamings.find({}, function (err, docs) {
    console.log(docs)
});