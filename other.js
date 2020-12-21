const Datastore = require('nedb');
var ffmpeg = require('fluent-ffmpeg');
//const streamings = new Datastore({ filename: 'streamings.db', timestampData: true, autoload: true }); 
//const db = require('./index');
const streamings = {
    streamings: new Datastore({ filename: 'streamings.db', timestampData: true, autoload: true })
};

const streamList = {
    streamList: []
} 

/* function data() {
    streamings.streamings.find({}, function (err, docs) {
        fetch('https://d1qvkrpvk32u24.cloudfront.net/RL/smil:US-3e12a6cf-546f-4cb3-8808-a7204577e240.smil/playlist.m3u8')
        .then(res => res.text())
        .then(body => streamList.streamList.push(body));
        //streamList.streamList.push(docs)
    });
}
setInterval(data, 5000); */

/* const fs = require("fs");
const https = require("https");

const file = fs.createWriteStream("data.txt");

https.get("https://d1qvkrpvk32u24.cloudfront.net/RL/smil:US-3e12a6cf-546f-4cb3-8808-a7204577e240.smil/playlist.m3u8", response => {
  var stream = response.pipe(file);

  stream.on("finish", function() {
    console.log("done");
  });
}); */

function data() {

  streamList.streamList.length=0

  streamings.streamings.find({}, function (err, docs) {
    for (stream in docs) {
      probe(docs[stream]._id, docs[stream].stream_url, docs[stream].name);
      /*doc = docs[stream]
      console.log('doc number ' + stream + ' is:')
      console.log(doc)
      ffmpeg.ffprobe(doc.stream_url, function(err, metadata) {
      subList.push(metadata);
      if (metadata) {
        console.log('metadata exists')
      } else{ 
        console.log('metadata does not exist')
      } */
      //console.log('metadata is:')
      //console.log(metadata)
      //console.log(docs[stream].stream_url)
      /* if (metadata){
        streamList.streamList.push({id: docs[stream]._id, online: 1})
      } else {
        streamList.streamList.push({id: docs[stream]._id, online: 0})
      }
      });*/
    }
  });
}
setInterval(data, 30000);

function probe(id, url, name){
  console.log('id is: ' + id)
  console.log('url is: ' + url)
  ffmpeg.ffprobe(url, function(err, metadata) {
    if (metadata && metadata.format.duration === 'N/A') {
      streamList.streamList.push({id: id, name: name, online: 1})
    } else {
      streamList.streamList.push({id: id, name: name, online: 0})
    }
  })
}

/* ffmpeg.ffprobe('http://congresodirecto-f.akamaihd.net/i/congreso6_1@54665/master.m3u8', function(err, metadata) {
  streamList.streamList.push(metadata);
});
 */

module.exports = {
  streamings,
  streamList,
}