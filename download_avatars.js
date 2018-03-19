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
    cb(err, body);
  });
}
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

