var md5 = require('md5');
console.log(md5('gakaki'));



let crypto          = require('crypto');
let md5             = crypto.createHash('md5');
let str             = "gakaki";
str                 = md5.update(str);
console.log(str)
str                 = md5.digest('hex');
console.log(str)
//
// var str = md5.digest('hex');
// console.log(str)
