var ffmpeg = require('fluent-ffmpeg');

function probe(url){
    ffmpeg.ffprobe(url, function(err, metadata) {
      if (metadata) {
        console.log(metadata)
      } else {
        console.log('no metadata')
        }
    })
  }

probe('http://senstream03.senado.es:1935/live/smil:punto7.smil/playlist.m3u8')