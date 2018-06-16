// build.js
// Very simple build script to run angular build
// Needed because all the cross platform things I tried didn't work

// No command line arguments, we're just going to use the env vars
let fs = require('fs')

let source = "bin/akEventCenter"
let target = "ak-cli-eventcenter-0.0.1"

var exec = require('child-process-promise').exec;

exec(`pkg ${source} --target node8-linux-x64 --output ${target}`)
    .then(function (result) {
        let stdout = result.stdout;
        let stderr = result.stderr;
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
    })
    .then(() => {
      exec(`ls ${target}\*`)
    .then(result => {
      for (let filename of result.stdout.split('\n')) {
	console.log(filename)
	if (!filename) {continue}
        let oldname = filename
        filename =filename.replace('-win-','-windows-')
        filename =filename.replace('-x64','-amd64')
        filename =filename.replace('macos','mac')
        filename =filename.replace('x86','386')
        fs.renameSync(oldname, filename)
        require('child_process').execSync(`shasum -a 256 ${filename} | awk '{print $1}' > ${filename}.sig`)
      }    
    })
    .catch(function (err) {
        console.error('ERROR: ', err);
    })
  })
