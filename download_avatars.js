var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
var properties = process.argv.slice(2);
var repoOwner = properties[0];
var repoName = properties[1];

 
console.log('Welcolme to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  if(properties.length < 2){
    console.log("You need to give the Owner's Name AND the Repo's Name");
    return;
  }
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token "+secrets.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    var arr = JSON.parse(body);
      arr.forEach(user => {
      // console.log(user.avatar_url);
      cb(err, user);
    });
  }) 
   .on('end', function(){
      console.log("Download Complete");
    }); 
}

function downloadImageByURL(url, filePath) {
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err; 
       })
       .pipe(fs.createWriteStream(filePath));               // Note 4
}

downloadImageByURL('https://avatars1.githubusercontent.com/u/43004?v=4', 'avatars/kvirani.jpg');

getRepoContributors(repoOwner, repoName, function(err, result) {
  if(err){
  console.log("Errors:", err);
}
  downloadImageByURL(result.avatar_url,`avatars/${result.login}.jpg`);
});

