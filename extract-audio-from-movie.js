#!/usr/bin/env node

/*
As a handy guide:
- a .avi movie's audio is probably .mp3
- a .mp4 movie's audio is probably .aac
Totally logical...
*/

'use strict';

const fs = require('fs');
const spawn = require('child_process').spawn;
// set some defaults for the audio file format and directory to iterate over
let codec = process.argv[2] || '.mp3';
let dir = process.argv[3] || '.';

fs.readdir(dir, (err, files) => {
  if (err) {
    console.log('error: ', err);
  } else {
    files.forEach((file) => {
      fs.stat(file, (err, stats) => {
        console.log('found file: ', file);
        if (err) {
          console.log(`error: ${err}`);
        }
        if (stats.isFile()) {
          extractAudioFrom(file, codec);
        } else if (stats.isDirectory()) {
          console.log(file, 'is a directory');
        }
      });
    });
  }
});

function extractAudioFrom(file, codec) {
  // The command we want to run:
  // ffmpeg -i input-video.avi -vn -acodec copy output-audio.aac
  console.log(`attempting to extract audio from '${file}'`);
  let process = spawn('ffmpeg', ['-i', file, '-vn', '-acodec', 'copy', file + codec]);
  process.stdout.on('data', (data) => {
    // console.log(data);
  });
  process.stderr.on('data', (data) => {
    // console.log(`ERROR: ${data}`);
  });
  // edit code 0 is success, so log an error if the exit code is a truthy value
  process.on('close', (code) => {
    if (code) {
      console.log(`error extracting audio from ${file}`);
      // delete the empty file that was created by ffmpeg
      spawn('rm', [file + codec]);
    } else {
      console.log(`extracted audio to '${file + codec}'`);
    }
  });
}
