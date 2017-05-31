/* builds the json file for use in the extension options */

const cdcm = require('/Users/iambriansreed/cdcm');
const fs = require('fs-extra');
const path = require('path');

let config = {
  localPath: './.tmp',
  cdnUrl: 'https://raw.githubusercontent.com/backtickbacktick/Library/master',
  linkFileExt: ['.js'],
};

console.log('JSON building...');

let commandDirs = require('./commandDirectoriesList')();

fs.ensureDirSync('./.tmp/commands');
fs.emptyDirSync('./.tmp/commands');

commandDirs.forEach(dir => {
  fs.copySync('./' + dir, './.tmp/commands/' + dir);
});

cdcm(config).getData().then(data => {

  let output = {};

  data.forEach(kind => {
    output[kind.type] = kind.items;
  });

  fs.writeJsonSync('./commands.json', output.commands, {spaces: 4});

  fs.removeSync('./.tmp');
  fs.removeSync('./.tmp-cdcm');

  console.log('JSON built.');

});