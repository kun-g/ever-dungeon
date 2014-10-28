var querystring = require('querystring');
require('./globals');
http = require('http');
request = require('request');
token = 'zJOCIGjlHDPnfibhSt5DpXmokA+bOZcgYVwWVT67RKzduHzlZ34OorjJB9qZbC8TPUGgNxa0yjXytkoJLn6foA==';
//token = 'zJOCIGjlHDPnfibhSt5DpXmokAi%2bbOZcgYVwWVT67RKzduHzlZ34OorjJB9qZbC8TPUGgNxa0yjXytkoJLn6foA%3d%3d'
passport = '53feeab500bb6215ac4d566c';
teebikURL = 'sdk.ios.teebik.com';
//token = new Buffer(token, 'base64').toString();
sign = md5Hash(token +'|'+  passport);
//sign = md5Hash(token1 +  passport);
path = 'http://' + teebikURL + '/check/user?token=' + token + '&uid=' + passport + '&Sign=' + sign;

function p(err, resp ,body) {
    //console.log(err,resp, body);
    console.log('Reply', body);
} 

var uid = passport;
var requestObj = {
    uid : passport,
    token:token, 
    sign : sign
};
var p1 = querystring.stringify(requestObj);
var p2 = "&token="+token+"&uid="+uid+"&sign="+sign;
var p3 = JSON.stringify(requestObj);
var post_data = p1;

var post_opt ={
    host : teebikURL ,
    port : '80',
   // path : '/check/user',
    path : '/test/index',
    method : 'POST',
    headers: {
        'Content-Length': post_data.length 
    }
};
//var post_req = http.request(post_opt, function (res) {
//    res.setEncoding('utf8');
//    res.on('data',function(chunk) {
//        console.log(chunk);
//    });
//});
//console.log('PostData', post_data);
//post_req.write(post_data);
////console.log(post_req.url, '=================');
//post_req.end();


//test_path = 'http://' + teebikURL + '/test/index?' + post_data
path = 'http://' + teebikURL + '/check/user?' + querystring.stringify(requestObj);
console.log('path :   ' + path);
http.get(path, function(res) {
          res.setEncoding('utf8');
          return res.on('data', function(chunk) {
            var result;
            console.log('---test ---', chunk);
          });
});


//request.post('http://' + teebikURL + '/check/user',
//        {form: { token:token, uid : passport, sign : sign}},
//        p);

//request.post({
//    url : 'http://' + teebikURL + '/check/user',
//    token:token, 
//    uid : passport,
//    sign : sign},
//    p);




//request.post({url: path}, p);
//http.request(path, function(res) {
//    res.setEncoding('utf8');
//    return res.on('data', function(chunk) {
//        var result;
//        result = JSON.parse(chunk);
//        console.log(result);
//    });
//});
//    

