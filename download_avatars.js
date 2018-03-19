var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
 
console.log('Welcolme to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
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

getRepoContributors("jquery", "jquery", function(err, result) {
  if(err){
  console.log("Errors:", err);
}
  downloadImageByURL(result.avatar_url,`avatars/${result.login}.jpg`);
});

