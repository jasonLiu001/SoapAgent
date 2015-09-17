var http = require('http');
var express = require('express');
var app = express();
var soap=require('soap'),
    soapServicesForSaaS=require('./soapServicesForSaaS.js');

var xml = require('fs').readFileSync('App2SaaSService.wsdl', 'utf8');
// use http to create webServer in order to support the soap listen method.
var server=http.createServer(app).listen(3337,function () {
    console.log('Express server http://127.0.0.1:3337');
});
//通云平台调用webservice服务接口
var soapServer=soap.listen(server, '/WebServices/App2SaaSService', soapServicesForSaaS.webServicesForSaaS, xml);
//webservice调用日志记录
soapServer.log = function(type, data) {
    var date=new Date();
    var currentTime=date.toDateString()+' '+date.toLocaleTimeString();
    if(type==="received"){
        console.log("["+currentTime+"]:接收的请求消息内容:"+data+"\r\n");
    }
    if(type==="replied"){
        console.log("["+currentTime+"]:服务器响应消息内容:"+data+"\r\n");
    }
};

