var request = require('request');
var secrects = require('./secrets.js');
 
console.log('Welcolme to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrects.GITHUB_TOKEN
    }
  };
   request(options, function(err, res, body) {
   var arr = JSON.parse(body);
   arr.forEach(i => {
    // console.log(i.avatar_url)
    cb(err, i.avatar_url);
    
   });
    
  }); 
}
getRepoContributors("jquery", "jquery", function(err, result) {
  if(err){
  console.log("Errors:", err);
}
  console.log('Avatar_Url: ', result);
});

