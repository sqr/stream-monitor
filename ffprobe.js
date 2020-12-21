var ffmpeg = require('fluent-ffmpeg');

function probe(url){
    ffmpeg.ffprobe(url, function(err, metadata) {
      if (metadata) {
        console.log(metadata.format.duration)
      } else {
        console.log('no metadata')
        }
    })
  }

probe('http://congresodirecto-f.akamaihd.net/i/congreso6_1@54665/master.m3u8')